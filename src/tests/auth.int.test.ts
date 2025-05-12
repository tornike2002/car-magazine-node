import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Auth API', () => {
  const username = 'testAdmin'
  const email = 'test@gmail.com'
  const password = 'testing123'

  it('should register a new admin', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username, email, password })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('User created successfully')
  })

  it('should login a user', async () => {
    const response = await request(app).post('/api/auth/login').send({ email, password })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User logged in successfully')
  })

  it('should logout a user', async () => {
    const response = await request(app).post('/api/auth/logout')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User logged out successfully')
  })
})
