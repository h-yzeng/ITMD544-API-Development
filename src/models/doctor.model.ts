import { z } from 'zod';

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  specialty: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export const CreateDoctorSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  specialty: z.string().min(1).max(100),
  phone: z.string().max(20).optional(),
});
export type CreateDoctorInput = z.infer<typeof CreateDoctorSchema>;
