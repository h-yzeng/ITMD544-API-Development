import { pool } from '../config/database';
import { Patient, CreatePatientInput } from '../models/patient.model';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const patientRepository = {
  async findAll(page = 1, limit = 10): Promise<PaginatedResult<Patient>> {
    const offset = (page - 1) * limit;
    const [rows, count] = await Promise.all([
      pool.query<Patient>('SELECT * FROM patients ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM patients'),
    ]);
    return { data: rows.rows, total: parseInt(count.rows[0].count), page, limit };
  },

  async findById(id: number): Promise<Patient | null> {
    const result = await pool.query<Patient>('SELECT * FROM patients WHERE id = $1', [id]);
    return result.rows[0] ?? null;
  },

  async create(input: CreatePatientInput): Promise<Patient> {
    const result = await pool.query<Patient>(
      `INSERT INTO patients (first_name, last_name, email, phone, date_of_birth)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [input.first_name, input.last_name, input.email, input.phone ?? null, input.date_of_birth ?? null],
    );
    return result.rows[0];
  },
};
