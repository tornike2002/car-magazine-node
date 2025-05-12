import { Router } from 'express'
import { register, login, logout } from '../controllers/auth'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../validators/auth'
const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', logout)

export default router
