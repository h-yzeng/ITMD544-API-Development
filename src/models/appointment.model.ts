import { z } from 'zod';

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  scheduled_at: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export const CreateAppointmentSchema = z.object({
  patient_id: z.number().int().positive(),
  doctor_id: z.number().int().positive(),
  scheduled_at: z.string().datetime(),
  reason: z.string().max(500).optional(),
  notes: z.string().optional(),
});
export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>;

export const UpdateAppointmentSchema = z.object({
  scheduled_at: z.string().datetime().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
  reason: z.string().max(500).optional(),
  notes: z.string().optional(),
});
export type UpdateAppointmentInput = z.infer<typeof UpdateAppointmentSchema>;
