import Carousel from '../model/Carousel'
import slugify from 'slugify'
import { Request, Response } from 'express'

export const createCarousel = async (req: Request, res: Response) => {
  const data = await Carousel.create(req.body)

  res.status(201).json({
    message: 'Carousel created successfully',
    data,
  })
}

export const getCarousel = async (req: Request, res: Response) => {
  const data = await Carousel.find().sort({ createdAt: -1 }).limit(4)

  res.status(200).json({
    message: 'Carousel fetched successfully',
    data,
  })
}

export const getCarouselBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params
  const formattedSlug = slugify(slug, { lower: true })
  const data = await Carousel.findOne({ slug: formattedSlug })

  if (!data) {
    res.status(404).json({
      message: 'Carousel item not found',
    })
    return
  }

  res.status(200).json({
    message: 'Carousel item fetched successfully',
    data,
  })
}

export const updateCarousel = async (req: Request, res: Response) => {
  const data = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!data) {
    res.status(404).json({
      message: 'Carousel item not found',
    })
    return
  }

  res.status(200).json({
    message: 'Carousel item updated successfully',
  })
}

export const deleteCarousel = async (req: Request, res: Response) => {
  const data = await Carousel.findByIdAndDelete(req.params.id)

  if (!data) {
    res.status(404).json({
      message: 'Carousel item not found',
    })
    return
  }

  res.status(200).json({
    message: 'Carousel item deleted successfully',
  })
}
