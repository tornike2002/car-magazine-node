import { Request, Response } from 'express'
import VehicleFilter from '../model/VehicleFilter'

export const createVehicleFilter = async (req: Request, res: Response) => {
  const data = await VehicleFilter.create(req.body)

  res.status(201).json({
    message: 'Vehicle filter created successfully',
    data,
  })
}

export const getVehicleFilter = async (_req: Request, res: Response) => {
  const data = await VehicleFilter.find().sort({ createdAt: -1 })

  res.status(200).json({
    message: 'Vehicle filter fetched successfully',
    data,
  })
}

export const updateVehicleFilter = async (req: Request, res: Response) => {
  const data = await VehicleFilter.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!data) {
    res.status(404).json({
      message: 'Vehicle filter not found',
    })
    return
  }

  res.status(200).json({
    message: 'Vehicle filter updated successfully',
    data,
  })
}

export const deleteVehicleFilter = async (req: Request, res: Response) => {
  const data = await VehicleFilter.findByIdAndDelete(req.params.id)

  if (!data) {
    res.status(404).json({
      message: 'Vehicle filter not found',
    })
    return
  }

  res.status(200).json({
    message: 'Vehicle filter deleted successfully',
    data,
  })
}
