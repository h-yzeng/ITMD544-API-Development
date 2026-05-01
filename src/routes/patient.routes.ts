import { Router } from 'express';
import { patientController } from '../controllers/patient.controller';
import { appointmentController } from '../controllers/appointment.controller';
import { validate } from '../middleware/validate';
import { CreatePatientSchema } from '../models/patient.model';

const router = Router();

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: List all patients
 *     tags: [Patients]
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
 *         description: Paginated list of patients
 */
router.get('/', patientController.list);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient object
 *       404:
 *         description: Patient not found
 */
router.get('/:id', patientController.getById);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Created patient
 *       400:
 *         description: Validation error
 */
router.post('/', validate(CreatePatientSchema), patientController.create);

/**
 * @swagger
 * /api/patients/{patientId}/appointments:
 *   get:
 *     summary: List all appointments for a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
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
 *         description: Patient not found
 */
router.get('/:patientId/appointments', appointmentController.getByPatient);

export default router;
