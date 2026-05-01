import { pool } from '../config/database';
import { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../models/appointment.model';
import { PaginatedResult } from './patient.repository';

const APPOINTMENT_WITH_JOINS = `
  SELECT a.*,
    row_to_json(p.*) AS patient,
    row_to_json(d.*) AS doctor
  FROM appointments a
  JOIN patients p ON p.id = a.patient_id
  JOIN doctors d ON d.id = a.doctor_id
`;

export const appointmentRepository = {
  async findById(id: number): Promise<Appointment | null> {
    const result = await pool.query(`${APPOINTMENT_WITH_JOINS} WHERE a.id = $1`, [id]);
    return result.rows[0] ?? null;
  },

  async findByPatient(patientId: number, page = 1, limit = 10): Promise<PaginatedResult<Appointment>> {
    const offset = (page - 1) * limit;
    const [rows, count] = await Promise.all([
      pool.query(
        `${APPOINTMENT_WITH_JOINS} WHERE a.patient_id = $1 ORDER BY a.scheduled_at LIMIT $2 OFFSET $3`,
        [patientId, limit, offset],
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM appointments WHERE patient_id = $1', [patientId]),
    ]);
    return { data: rows.rows, total: parseInt(count.rows[0].count), page, limit };
  },

  async findByDoctor(doctorId: number, page = 1, limit = 10): Promise<PaginatedResult<Appointment>> {
    const offset = (page - 1) * limit;
    const [rows, count] = await Promise.all([
      pool.query(
        `${APPOINTMENT_WITH_JOINS} WHERE a.doctor_id = $1 ORDER BY a.scheduled_at LIMIT $2 OFFSET $3`,
        [doctorId, limit, offset],
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM appointments WHERE doctor_id = $1', [doctorId]),
    ]);
    return { data: rows.rows, total: parseInt(count.rows[0].count), page, limit };
  },

  async create(input: CreateAppointmentInput): Promise<Appointment> {
    const result = await pool.query<{ id: number }>(
      `INSERT INTO appointments (patient_id, doctor_id, scheduled_at, reason, notes)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [input.patient_id, input.doctor_id, input.scheduled_at, input.reason ?? null, input.notes ?? null],
    );
    return this.findById(result.rows[0].id) as Promise<Appointment>;
  },

  async update(id: number, input: UpdateAppointmentInput): Promise<Appointment | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let i = 1;
    if (input.scheduled_at !== undefined) { fields.push(`scheduled_at = $${i++}`); values.push(input.scheduled_at); }
    if (input.status !== undefined) { fields.push(`status = $${i++}`); values.push(input.status); }
    if (input.reason !== undefined) { fields.push(`reason = $${i++}`); values.push(input.reason); }
    if (input.notes !== undefined) { fields.push(`notes = $${i++}`); values.push(input.notes); }
    if (!fields.length) return this.findById(id);
    fields.push(`updated_at = NOW()`);
    values.push(id);
    await pool.query(
      `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${i}`,
      values,
    );
    return this.findById(id);
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
