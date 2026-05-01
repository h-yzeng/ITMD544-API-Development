import { Router } from 'express';
import { doctorController } from '../controllers/doctor.controller';
import { appointmentController } from '../controllers/appointment.controller';
import { validate } from '../middleware/validate';
import { CreateDoctorSchema } from '../models/doctor.model';

const router = Router();

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: List all doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of doctors
 */
router.get('/', doctorController.list);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor object
 *       404:
 *         description: Doctor not found
 */
router.get('/:id', doctorController.getById);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email, specialty]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               specialty:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created doctor
 *       400:
 *         description: Validation error
 */
router.post('/', validate(CreateDoctorSchema), doctorController.create);

/**
 * @swagger
 * /api/doctors/{doctorId}/appointments:
 *   get:
 *     summary: List all appointments for a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of appointments
 *       404:
 *         description: Doctor not found
 */
router.get('/:doctorId/appointments', appointmentController.getByDoctor);

export default router;
