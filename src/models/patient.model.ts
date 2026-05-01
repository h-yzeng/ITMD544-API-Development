import { z } from 'zod';

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  created_at: Date;
  updated_at: Date;
}

export const CreatePatientSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  date_of_birth: z.string().date().optional(),
});
export type CreatePatientInput = z.infer<typeof CreatePatientSchema>;
