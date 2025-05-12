import { Router } from 'express'
import {
  createCarousel,
  getCarousel,
  getCarouselBySlug,
  updateCarousel,
  deleteCarousel,
} from '../controllers/carousel'
import { validate } from '../middlewares/validate'
import { carouselSchema } from '../validators/carousel'
import { requireAdmin } from '../middlewares/auth'

const router = Router()

// public routes
router.get('/', getCarousel)
router.get('/:slug', getCarouselBySlug)

// admin routes
router.post('/', requireAdmin, validate(carouselSchema), createCarousel)
router.put('/:id', requireAdmin, validate(carouselSchema), updateCarousel)
router.delete('/:id', requireAdmin, deleteCarousel)

export default router

/**
 * @swagger
 * components:
 *   schemas:
 *     Carousel:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - tags
 *         - category
 *         - slug
 *         - singleTitle
 *         - singleImage
 *         - singleDescription
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the carousel item
 *         image:
 *           type: string
 *           description: URL of the carousel image
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the carousel item
 *         category:
 *           type: string
 *           description: Category of the carousel item
 *         slug:
 *           type: string
 *           description: URL-friendly identifier for the carousel item
 *         singleTitle:
 *           type: string
 *           description: Title for the single view of the carousel item
 *         singleImage:
 *           type: string
 *           description: Image for the single view of the carousel item
 *         singleDescription:
 *           type: string
 *           description: Description for the single view of the carousel item
 *         socials:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *               description: Facebook link
 *             instagram:
 *               type: string
 *               description: Instagram link
 *             x:
 *               type: string
 *               description: X (Twitter) link
 *             youtube:
 *               type: string
 *               description: YouTube link
 * 
 * @swagger
 * tags:
 *   name: Carousel
 *   description: Carousel management API
 * 
 * @swagger
 * /api/carousel:
 *   get:
 *     summary: Get recent carousel items
 *     tags: [Carousel]
 *     responses:
 *       200:
 *         description: List of carousel items fetched successfully
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
 *                     $ref: '#/components/schemas/Carousel'
 *   post:
 *     summary: Create a new carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carousel'
 *     responses:
 *       201:
 *         description: Carousel item created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 * 
 * @swagger
 * /api/carousel/{slug}:
 *   get:
 *     summary: Get carousel item by slug
 *     tags: [Carousel]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug of the carousel item
 *     responses:
 *       200:
 *         description: Carousel item fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Carousel'
 *       404:
 *         description: Carousel item not found
 * 
 * @swagger
 * /api/carousel/{id}:
 *   put:
 *     summary: Update a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the carousel item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carousel'
 *     responses:
 *       200:
 *         description: Carousel item updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Carousel item not found
 *   delete:
 *     summary: Delete a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the carousel item
 *     responses:
 *       200:
 *         description: Carousel item deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Carousel item not found
 */
