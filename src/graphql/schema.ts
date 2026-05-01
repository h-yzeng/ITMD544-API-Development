export const typeDefs = `#graphql
  type Patient {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    phone: String
    date_of_birth: String
    created_at: String!
    appointments: [Appointment!]
  }

  type Doctor {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    specialty: String!
    phone: String
    created_at: String!
    appointments: [Appointment!]
  }

  type Appointment {
    id: ID!
    patient: Patient!
    doctor: Doctor!
    scheduled_at: String!
    status: AppointmentStatus!
    reason: String
    notes: String
    created_at: String!
  }

  enum AppointmentStatus {
    scheduled
    completed
    cancelled
  }

  type PaginatedPatients {
    data: [Patient!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  type PaginatedDoctors {
    data: [Doctor!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  type PaginatedAppointments {
    data: [Appointment!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  type Query {
    patients(page: Int, limit: Int): PaginatedPatients!
    patient(id: ID!): Patient
    doctors(page: Int, limit: Int): PaginatedDoctors!
    doctor(id: ID!): Doctor
    appointment(id: ID!): Appointment
    patientAppointments(patientId: ID!, page: Int, limit: Int): PaginatedAppointments!
    doctorAppointments(doctorId: ID!, page: Int, limit: Int): PaginatedAppointments!
  }

  type Mutation {
    createPatient(
      first_name: String!
      last_name: String!
      email: String!
      phone: String
      date_of_birth: String
    ): Patient!

    createDoctor(
      first_name: String!
      last_name: String!
      email: String!
      specialty: String!
      phone: String
    ): Doctor!

    createAppointment(
      patient_id: ID!
      doctor_id: ID!
      scheduled_at: String!
      reason: String
      notes: String
    ): Appointment!

    updateAppointment(
      id: ID!
      scheduled_at: String
      status: AppointmentStatus
      reason: String
      notes: String
    ): Appointment!

    deleteAppointment(id: ID!): Boolean!
  }
`;
