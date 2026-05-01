import { patientResolvers } from './patient.resolver';
import { doctorResolvers } from './doctor.resolver';
import { appointmentResolvers } from './appointment.resolver';

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
};
