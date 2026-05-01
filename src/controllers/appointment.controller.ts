import { Request, Response, NextFunction } from 'express';
import { appointmentService } from '../services/appointment.service';
import { CreateAppointmentInput, UpdateAppointmentInput } from '../models/appointment.model';

export const appointmentController = {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await appointmentService.getById(Number(req.params.id)));
    } catch (err) { next(err); }
  },

  async getByPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.json(await appointmentService.getByPatient(Number(req.params.patientId), page, limit));
    } catch (err) { next(err); }
  },

  async getByDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.json(await appointmentService.getByDoctor(Number(req.params.doctorId), page, limit));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const appt = await appointmentService.create(req.body as CreateAppointmentInput);
      res.status(201).json(appt);
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await appointmentService.update(Number(req.params.id), req.body as UpdateAppointmentInput));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await appointmentService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
