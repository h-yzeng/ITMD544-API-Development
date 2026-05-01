import { patientResolvers } from './patient.resolver';
import { doctorResolvers } from './doctor.resolver';
import { appointmentResolvers } from './appointment.resolver';

const toISO = (val: unknown) => val ? new Date(val as string | number | Date).toISOString() : null;

export const resolvers = {
  Query: {
    ...patientResolvers.Query,
    ...doctorResolvers.Query,
    ...appointmentResolvers.Query,
  },
  Mutation: {
    ...patientResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...appointmentResolvers.Mutation,
  },
  Patient: {
    created_at: (p: any) => toISO(p.created_at),
    date_of_birth: (p: any) => p.date_of_birth ? new Date(p.date_of_birth).toISOString().split('T')[0] : null,
  },
  Doctor: {
    created_at: (d: any) => toISO(d.created_at),
  },
  Appointment: {
    scheduled_at: (a: any) => toISO(a.scheduled_at),
    created_at: (a: any) => toISO(a.created_at),
  },
};
