import z from 'zod'

const createVehicleFilterSchema = z.object({
  body: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1),
  price: z.number().min(1),
  color: z.string().min(1),
  transmission: z.string().min(1),
  mileage: z.number().min(1),
  engine: z.number().min(1),
  fuelType: z.string().min(1),
})

const updateVehicleFilterSchema = createVehicleFilterSchema.partial()

export { createVehicleFilterSchema, updateVehicleFilterSchema }
