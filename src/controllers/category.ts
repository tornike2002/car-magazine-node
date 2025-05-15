import { Request, Response } from 'express'
import Category from '../model/Category'

export const createCategory = async (req: Request, res: Response) => {
  const data = await Category.create(req.body)

  res.status(201).json({
    message: 'Category created successfully',
    data,
  })
}

export const getAllCategories = async (_req: Request, res: Response) => {
  const data = await Category.find().sort({ createdAt: -1 })

  res.status(200).json({
    message: 'Categories fetched successfully',
    data,
  })
}

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params

  const data = await Category.findById(id)

  if (!data) {
    res.status(404).json({
      message: 'Category not found',
    })
    return
  }

  res.status(200).json({
    message: 'Category fetched successfully',
    data,
  })
}

export const updateCategoryById = async (req: Request, res: Response) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!data) {
    res.status(404).json({
      message: 'Category not found',
    })
    return
  }

  res.status(200).json({
    message: 'Category updated successfully',
    data,
  })
}

export const deleteCategoryById = async (req: Request, res: Response) => {
  const data = await Category.findByIdAndDelete(req.params.id)

  if (!data) {
    res.status(404).json({
      message: 'Category not found',
    })
    return
  }

  res.status(200).json({
    message: 'Category deleted successfully',
    data,
  })
}
