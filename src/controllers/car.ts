import { Request, Response } from 'express'
import Car from '../model/Car'
import slugify from 'slugify'
import { CarFilters } from '../types/car'

export const createCar = async (req: Request, res: Response) => {
  const slug = slugify(req.body.name, { lower: true, strict: true })
  const ifExists = await Car.findOne({ slug })

  if (ifExists) {
    res.status(400).json({
      message: 'Car already exists',
    })
    return
  }
  const data = await Car.create({ ...req.body, slug })

  res.status(201).json({
    message: 'Car created successfully',
    data,
  })
}

export const getAllCars = async (req: Request, res: Response) => {
  const { category, tag, search, vehicleFilter, page = 1, limit = 20 } = req.query
  const filters: CarFilters = {}

  if (category) filters.category = category as string
  if (tag) filters.tag = { $in: tag as string[] }
  if (search) filters.search = { $search: search as string }
  if (vehicleFilter) filters.vehicleFilter = vehicleFilter as CarFilters['vehicleFilter']

  const skip = (Number(page) - 1) * Number(limit)
  const [cars, total] = await Promise.all([
    Car.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Car.countDocuments(filters),
  ])

  res.status(200).json({
    message: 'Cars fetched successfully',
    data: cars,
    total,
    page: Number(page),
    limit: Number(limit),
  })
}

export const getCarBySlug = async (req: Request, res: Response) => {
  const data = await Car.findOne({ slug: req.params.slug })

  if (!data) {
    res.status(404).json({
      message: 'Car not found',
    })
    return
  }

  res.status(200).json({
    message: 'Car fetched successfully',
    data,
  })
}

export const updateCar = async (req: Request, res: Response) => {
  const data = await Car.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })

  if (!data) {
    res.status(404).json({
      message: 'Car not found',
    })
    return
  }

  res.status(200).json({
    message: 'Car updated successfully',
    data,
  })
}

export const deleteCar = async (req: Request, res: Response) => {
  const data = await Car.findOneAndDelete({ slug: req.params.slug })

  if (!data) {
    res.status(404).json({
      message: 'Car not found',
    })
    return
  }

  res.status(200).json({
    message: 'Car deleted successfully',
    data,
  })
}
