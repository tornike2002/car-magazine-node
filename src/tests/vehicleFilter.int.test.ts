import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let adminToken: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const admin = await createTestAdmin()
  adminToken = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Vehicle Filter API', () => {
  let id: string

  it('should create a new vehicle filter', async () => {
    const response = await request(app)
      .post('/api/vehicle-filter')
      .set('Cookie', `token=${adminToken}`)
      .send({
        body: 'Sedan',
        model: 'Toyota',
        year: 2020,
        price: 100000,
        color: 'Red',
        transmission: 'Automatic',
        mileage: 10000,
        engine: 2.0,
        fuelType: 'Gasoline',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Vehicle filter created successfully')
    id = response.body.data._id
  })

  it('should get all vehicle filters', async () => {
    const response = await request(app).get('/api/vehicle-filter')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Vehicle filter fetched successfully')
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('should update a vehicle filter', async () => {
    const response = await request(app)
      .put(`/api/vehicle-filter/${id}`)
      .set('Cookie', `token=${adminToken}`)
      .send({
        body: 'Sedan',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Vehicle filter updated successfully')
  })

  it('should delete a vehicle filter', async () => {
    const response = await request(app)
      .delete(`/api/vehicle-filter/${id}`)
      .set('Cookie', `token=${adminToken}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Vehicle filter deleted successfully')
  })
})
