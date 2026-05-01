import { Request, Response, NextFunction } from 'express';
import { doctorService } from '../services/doctor.service';
import { CreateDoctorInput } from '../models/doctor.model';

export const doctorController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.json(await doctorService.getAll(page, limit));
    } catch (err) { next(err); }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await doctorService.getById(Number(req.params.id)));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await doctorService.create(req.body as CreateDoctorInput);
      res.status(201).json(doctor);
    } catch (err) { next(err); }
  },
};
