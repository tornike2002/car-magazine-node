
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

describe('Tags API', () => {
  let id: string

  it('should create a tag', async () => {
    const res = await request(app)
      .post('/api/tags')
      .set('Cookie', `token=${token}`)
      .send({ name: 'Test Tag' })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Tag created successfully')
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.name).toBe('Test Tag')
    id = res.body.data._id
  })

  it('should get all tags', async () => {
    const res = await request(app).get('/api/tags')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.message).toBe('Tags fetched successfully')
    expect(res.body.data.length).toBe(1)
  })

  it('should update a tag by id', async () => {
    const res = await request(app)
      .put(`/api/tags/${id}`)
      .set('Cookie', `token=${token}`)
      .send({ name: 'Updated Tag' })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Tag updated successfully')
    expect(res.body.data._id).toBe(id)
    expect(res.body.data.name).toBe('Updated Tag')
  })

  it('should delete a tag by id', async () => {
    const res = await request(app).delete(`/api/tags/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Tag deleted successfully')
    expect(res.body.data._id).toBe(id)
  })
})
