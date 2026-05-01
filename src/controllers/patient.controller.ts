import { Request, Response, NextFunction } from 'express';
import { patientService } from '../services/patient.service';
import { CreatePatientInput } from '../models/patient.model';

export const patientController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.json(await patientService.getAll(page, limit));
    } catch (err) { next(err); }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await patientService.getById(Number(req.params.id)));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const patient = await patientService.create(req.body as CreatePatientInput);
      res.status(201).json(patient);
    } catch (err) { next(err); }
  },
};
