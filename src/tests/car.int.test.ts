import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Car API', () => {
  let slug: string
  let id: string
  it('should create a car', async () => {
    const response = await request(app).post('/api/cars').set('Cookie', `token=${token}`).send({
      name: 'Test Car',
      description: 'Test Description',
      price: 10000,
      images: ['image1.jpg', 'image2.jpg'],
      category: 'Test Category',
      tags: ['tag1', 'tag2'],
      body: 'Sedan',
      model: 'Test Model',
      year: 2023,
      color: 'Red',
      transmission: 'Automatic',
      mileage: 1000,
      engine: 2000,
      fuelType: 'Petrol'
    })

    expect(response.status).toBe(201)
    expect(response.body.data).toBeInstanceOf(Object)
    id = response.body.data._id
    slug = response.body.data.slug
  })

  it('should get all cars', async () => {
    const response = await request(app).get('/api/cars')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  it('should get a car by slug', async () => {
    const response = await request(app).get(`/api/cars/${slug}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Object)
  })

  it('should update a car', async () => {
    const response = await request(app)
      .put(`/api/cars/${slug}`)
      .set('Cookie', `token=${token}`)
      .send({
        name: 'Updated Car',
        description: 'Updated Description',
        price: 15000,
        images: ['updated1.jpg', 'updated2.jpg'],
        category: 'Updated Category',
        tags: ['updated1', 'updated2'],
        body: 'SUV',
        model: 'Updated Model',
        year: 2024,
        color: 'Blue',
        transmission: 'Manual',
        mileage: 2000,
        engine: 2500,
        fuelType: 'Diesel'
      })

    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Object)
  })

  it('should delete a car', async () => {
    const response = await request(app).delete(`/api/cars/${slug}`).set('Cookie', `token=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Object)
  })
})
