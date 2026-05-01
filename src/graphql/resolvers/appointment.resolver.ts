import { appointmentService } from '../../services/appointment.service';

export const appointmentResolvers = {
  Query: {
    appointment: (_: unknown, { id }: { id: string }) =>
      appointmentService.getById(Number(id)).catch(() => null),
    patientAppointments: (_: unknown, { patientId, page, limit }: { patientId: string; page?: number; limit?: number }) =>
      appointmentService.getByPatient(Number(patientId), page, limit),
    doctorAppointments: (_: unknown, { doctorId, page, limit }: { doctorId: string; page?: number; limit?: number }) =>
      appointmentService.getByDoctor(Number(doctorId), page, limit),
  },
  Mutation: {
    createAppointment: (_: unknown, args: { patient_id: string; doctor_id: string; scheduled_at: string; reason?: string; notes?: string }) =>
      appointmentService.create({
        ...args,
        patient_id: Number(args.patient_id),
        doctor_id: Number(args.doctor_id),
      }),
    updateAppointment: (_: unknown, { id, ...rest }: { id: string; scheduled_at?: string; status?: 'scheduled' | 'completed' | 'cancelled'; reason?: string; notes?: string }) =>
      appointmentService.update(Number(id), rest),
    deleteAppointment: (_: unknown, { id }: { id: string }) =>
      appointmentService.delete(Number(id)).then(() => true).catch(() => false),
  },
};
