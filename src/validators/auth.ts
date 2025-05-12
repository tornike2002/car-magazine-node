import z from 'zod'

export const registerSchema = z.object({
  username: z.string().min(1).max(25),
  email: z.string().email(),
  password: z.string().min(6),
})
