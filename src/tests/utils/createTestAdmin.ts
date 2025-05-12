import Auth from '../../model/Auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createTestAdmin = async () => {
  const password = await bcrypt.hash('testing123', 10)
  const admin = await Auth.create({ username: 'testAdmin', email: 'test@gmail.com', password })

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
  return { admin, token }
}
