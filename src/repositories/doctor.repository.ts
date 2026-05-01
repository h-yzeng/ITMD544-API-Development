import { pool } from '../config/database';
import { Doctor, CreateDoctorInput } from '../models/doctor.model';
import { PaginatedResult } from './patient.repository';

export const doctorRepository = {
  async findAll(page = 1, limit = 10): Promise<PaginatedResult<Doctor>> {
    const offset = (page - 1) * limit;
    const [rows, count] = await Promise.all([
      pool.query<Doctor>('SELECT * FROM doctors ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM doctors'),
    ]);
    return { data: rows.rows, total: parseInt(count.rows[0].count), page, limit };
  },

  async findById(id: number): Promise<Doctor | null> {
    const result = await pool.query<Doctor>('SELECT * FROM doctors WHERE id = $1', [id]);
    return result.rows[0] ?? null;
  },

  async create(input: CreateDoctorInput): Promise<Doctor> {
    const result = await pool.query<Doctor>(
      `INSERT INTO doctors (first_name, last_name, email, specialty, phone)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [input.first_name, input.last_name, input.email, input.specialty, input.phone ?? null],
    );
    return result.rows[0];
  },
};
