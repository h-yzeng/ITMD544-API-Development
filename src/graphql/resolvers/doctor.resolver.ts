import { doctorService } from '../../services/doctor.service';

export const doctorResolvers = {
  Query: {
    doctors: (_: unknown, { page, limit }: { page?: number; limit?: number }) =>
      doctorService.getAll(page, limit),
    doctor: (_: unknown, { id }: { id: string }) =>
      doctorService.getById(Number(id)).catch(() => null),
  },
  Mutation: {
    createDoctor: (_: unknown, args: { first_name: string; last_name: string; email: string; specialty: string; phone?: string }) =>
      doctorService.create(args),
  },
};
