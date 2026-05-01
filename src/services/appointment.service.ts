import { appointmentRepository } from '../repositories/appointment.repository';
import { patientRepository } from '../repositories/patient.repository';
import { doctorRepository } from '../repositories/doctor.repository';
import { CreateAppointmentInput, UpdateAppointmentInput } from '../models/appointment.model';

export const appointmentService = {
  async getById(id: number) {
    const appt = await appointmentRepository.findById(id);
    if (!appt) throw Object.assign(new Error('Appointment not found'), { status: 404 });
    return appt;
  },

  async getByPatient(patientId: number, page?: number, limit?: number) {
    const patient = await patientRepository.findById(patientId);
    if (!patient) throw Object.assign(new Error('Patient not found'), { status: 404 });
    return appointmentRepository.findByPatient(patientId, page, limit);
  },

  async getByDoctor(doctorId: number, page?: number, limit?: number) {
    const doctor = await doctorRepository.findById(doctorId);
    if (!doctor) throw Object.assign(new Error('Doctor not found'), { status: 404 });
    return appointmentRepository.findByDoctor(doctorId, page, limit);
  },

  async create(input: CreateAppointmentInput) {
    const [patient, doctor] = await Promise.all([
      patientRepository.findById(input.patient_id),
      doctorRepository.findById(input.doctor_id),
    ]);
    if (!patient) throw Object.assign(new Error('Patient not found'), { status: 404 });
    if (!doctor) throw Object.assign(new Error('Doctor not found'), { status: 404 });
    return appointmentRepository.create(input);
  },

  async update(id: number, input: UpdateAppointmentInput) {
    const appt = await appointmentRepository.update(id, input);
    if (!appt) throw Object.assign(new Error('Appointment not found'), { status: 404 });
    return appt;
  },

  async delete(id: number) {
    const deleted = await appointmentRepository.delete(id);
    if (!deleted) throw Object.assign(new Error('Appointment not found'), { status: 404 });
  },
};
