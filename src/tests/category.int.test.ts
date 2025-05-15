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

describe('Category API', () => {
  let id: string

  it('should create a category', async () => {
    const res = await request(app)
      .post('/api/category')
      .set('Cookie', `token=${token}`)
      .send({ name: 'Test Category' })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Category created successfully')
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.name).toBe('Test Category')
    id = res.body.data._id
  })

  it('should get all categories', async () => {
    const res = await request(app).get('/api/category')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.message).toBe('Categories fetched successfully')
    expect(res.body.data.length).toBe(1)
  })

  it('should get a category by id', async () => {
    const res = await request(app).get(`/api/category/${id}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Category fetched successfully')
    expect(res.body.data._id).toBe(id)
  })

  it('should update a category by id', async () => {
    const res = await request(app)
      .put(`/api/category/${id}`)
      .set('Cookie', `token=${token}`)
      .send({ name: 'Updated Category' })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Category updated successfully')
    expect(res.body.data._id).toBe(id)
    expect(res.body.data.name).toBe('Updated Category')
  })

  it('should delete a category by id', async () => {
    const res = await request(app).delete(`/api/category/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Category deleted successfully')
    expect(res.body.data._id).toBe(id)
  })
})
