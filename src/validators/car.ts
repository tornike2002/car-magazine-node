import z from 'zod'

const createCarSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  images: z.array(z.string().min(1)),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  body: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1),
  color: z.string().min(1),
  transmission: z.string().min(1),
  mileage: z.number().min(1),
  engine: z.number().min(1),
  fuelType: z.string().min(1),
})

const updateCarSchema = createCarSchema.partial()

export { createCarSchema, updateCarSchema }
