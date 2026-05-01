import { patientService } from '../../services/patient.service';

export const patientResolvers = {
  Query: {
    patients: (_: unknown, { page, limit }: { page?: number; limit?: number }) =>
      patientService.getAll(page, limit),
    patient: (_: unknown, { id }: { id: string }) =>
      patientService.getById(Number(id)).catch(() => null),
  },
  Mutation: {
    createPatient: (_: unknown, args: { first_name: string; last_name: string; email: string; phone?: string; date_of_birth?: string }) =>
      patientService.create(args),
  },
};
