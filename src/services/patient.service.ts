import { patientRepository } from '../repositories/patient.repository';
import { CreatePatientInput } from '../models/patient.model';

export const patientService = {
  async getAll(page?: number, limit?: number) {
    return patientRepository.findAll(page, limit);
  },

  async getById(id: number) {
    const patient = await patientRepository.findById(id);
    if (!patient) throw Object.assign(new Error('Patient not found'), { status: 404 });
    return patient;
  },

  async create(input: CreatePatientInput) {
    return patientRepository.create(input);
  },
};
