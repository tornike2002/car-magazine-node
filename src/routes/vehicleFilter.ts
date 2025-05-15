import { Router } from 'express'
import {
  createVehicleFilter,
  getVehicleFilter,
  updateVehicleFilter,
  deleteVehicleFilter,
} from '../controllers/vehicleFilter'
import { validate } from '../middlewares/validate'
import { createVehicleFilterSchema, updateVehicleFilterSchema } from '../validators/vehicleFilter'
import { requireAdmin } from '../middlewares/auth'
const router = Router()

// public routes
router.get('/', getVehicleFilter)

// admin routes
router.post('/', requireAdmin, validate(createVehicleFilterSchema), createVehicleFilter)
router.put('/:id', requireAdmin, validate(updateVehicleFilterSchema), updateVehicleFilter)
router.delete('/:id', requireAdmin, deleteVehicleFilter)

export default router

/**
 * @swagger
 * tags:
 *   name: VehicleFilter
 *   description: Vehicle filter management
 */

/**
 * @swagger
 * /vehicle-filter:
 *   get:
 *     summary: Get all vehicle filters
 *     tags: [VehicleFilter]
 *     responses:
 *       200:
 *         description: List of vehicle filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VehicleFilter'
 * 
 *   post:
 *     summary: Create a new vehicle filter
 *     tags: [VehicleFilter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleFilter'
 *     responses:
 *       201:
 *         description: Vehicle filter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/VehicleFilter'
 */

/**
 * @swagger
 * /vehicle-filter/{id}:
 *   put:
 *     summary: Update a vehicle filter
 *     tags: [VehicleFilter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleFilter'
 *     responses:
 *       200:
 *         description: Vehicle filter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/VehicleFilter'
 *       404:
 *         description: Vehicle filter not found
 * 
 *   delete:
 *     summary: Delete a vehicle filter
 *     tags: [VehicleFilter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle filter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/VehicleFilter'
 *       404:
 *         description: Vehicle filter not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VehicleFilter:
 *       type: object
 *       required:
 *         - body
 *         - model
 *         - year
 *         - price
 *         - color
 *         - transmission
 *         - mileage
 *         - engine
 *         - fuelType
 *       properties:
 *         body:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: number
 *         price:
 *           type: number
 *         color:
 *           type: string
 *         transmission:
 *           type: string
 *         mileage:
 *           type: number
 *         engine:
 *           type: number
 *         fuelType:
 *           type: string
 */

