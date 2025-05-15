import { Router } from 'express'
import { createCar, getAllCars, getCarBySlug, updateCar, deleteCar } from '../controllers/car'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { createCarSchema, updateCarSchema } from '../validators/car'

const router = Router()

// public routes
router.get('/', getAllCars)
router.get('/:slug', getCarBySlug)

// admin routes
router.post('/', requireAdmin, validate(createCarSchema), createCar)
router.put('/:slug', requireAdmin, validate(updateCarSchema), updateCar)
router.delete('/:slug', requireAdmin, deleteCar)

export default router

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of cars
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
 *                     $ref: '#/components/schemas/Car'
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 limit:
 *                   type: number
 */

/**
 * @swagger
 * /cars/{slug}:
 *   get:
 *     summary: Get car by slug
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Car slug
 *     responses:
 *       200:
 *         description: Car data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarInput'
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       400:
 *         description: Car already exists
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cars/{slug}:
 *   put:
 *     summary: Update car (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Car slug
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCarInput'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * /cars/{slug}:
 *   delete:
 *     summary: Delete car (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Car slug
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         body:
 *           type: string
 *         model:
 *           type: string
 *         year:
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
 *         slug:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - images
 *         - category
 *         - tags
 *         - body
 *         - model
 *         - year
 *         - color
 *         - transmission
 *         - mileage
 *         - engine
 *         - fuelType
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         body:
 *           type: string
 *         model:
 *           type: string
 *         year:
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
 *     UpdateCarInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         body:
 *           type: string
 *         model:
 *           type: string
 *         year:
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
