import { Request, Response } from 'express'
import Auth from '../model/Auth'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const user = await Auth.findOne({ email })

  if (user) {
    res.status(400).json({ message: 'User already exists' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await Auth.create({
    username,
    email,
    password: hashedPassword,
  })

  const token = generateToken(newUser._id.toString())
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  })

  res.status(201).json({ message: 'User created successfully' })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await Auth.findOne({ email })

  if (!existingUser) {
    res.status(400).json({ message: 'User not found' })
    return
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordMatch) {
    res.status(400).json({ message: 'Invalid password' })
    return
  }

  const token = generateToken(existingUser._id.toString())
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  })

  res.status(200).json({ message: 'User logged in successfully' })
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'User logged out successfully' })
}
