import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'


let token: string
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Carousel API', () => {
  let id: string
  let slug: string
  
  it('should create a new carousel item', async () => {
    const res = await request(app)
      .post('/api/carousel')
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Carousel',
        image: 'https://via.placeholder.com/150',
        tags: ['test', 'carousel'],
        category: 'test',
        slug: 'test-carousel',
        singleTitle: 'Test Carousel',
        singleImage: 'https://via.placeholder.com/150',
        singleDescription: 'Test Carousel',
        socials: {
          facebook: 'https://www.facebook.com/test',
          instagram: 'https://www.instagram.com/test',
          x: 'https://www.x.com/test',
          youtube: 'https://www.youtube.com/test',
        },
      })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Carousel created successfully')
    expect(res.body.data).toBeDefined()
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.title).toBe('Test Carousel')
    expect(res.body.data.image).toBe('https://via.placeholder.com/150')
    expect(res.body.data.tags).toEqual(['test', 'carousel'])
    expect(res.body.data.category).toBe('test')
    expect(res.body.data.slug).toBe('test-carousel')
    expect(res.body.data.singleTitle).toBe('Test Carousel')
    
    id = res.body.data._id
    slug = res.body.data.slug
  })

  it('should get all carousel items', async () => {
    const res = await request(app).get('/api/carousel')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel fetched successfully')
    expect(res.body.data).toBeDefined()
    expect(res.body.data.length).toBeGreaterThan(0)
  })

  it('should get a carousel item by slug', async () => {
    const res = await request(app).get(`/api/carousel/${slug}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel item fetched successfully')
    expect(res.body.data).toBeDefined()
    expect(res.body.data.title).toBe('Test Carousel')
    expect(res.body.data.image).toBe('https://via.placeholder.com/150')
    expect(res.body.data.tags).toEqual(['test', 'carousel'])
    expect(res.body.data.category).toBe('test')
    expect(res.body.data.slug).toBe('test-carousel')
    expect(res.body.data.singleTitle).toBe('Test Carousel')
  })

  it('should update a carousel item', async () => {
    const res = await request(app)
      .put(`/api/carousel/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Updated Carousel',
        image: 'https://via.placeholder.com/150',
        tags: ['test', 'carousel'],
        category: 'test',
        slug: 'test-carousel',
        singleTitle: 'Updated Carousel',
        singleImage: 'https://via.placeholder.com/150',
        singleDescription: 'Updated Carousel',
        socials: {
          facebook: 'https://www.facebook.com/updated',
          instagram: 'https://www.instagram.com/updated',
          x: 'https://www.x.com/updated',
          youtube: 'https://www.youtube.com/updated',
        },
      })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel item updated successfully')
  })
  
  it('should delete a carousel item', async () => {
    const res = await request(app)
      .delete(`/api/carousel/${id}`)
      .set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel item deleted successfully')
  })
})
