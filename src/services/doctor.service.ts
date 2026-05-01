import { doctorRepository } from '../repositories/doctor.repository';
import { CreateDoctorInput } from '../models/doctor.model';

export const doctorService = {
  async getAll(page?: number, limit?: number) {
    return doctorRepository.findAll(page, limit);
  },

  async getById(id: number) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) throw Object.assign(new Error('Doctor not found'), { status: 404 });
    return doctor;
  },

  async create(input: CreateDoctorInput) {
    return doctorRepository.create(input);
  },
};
