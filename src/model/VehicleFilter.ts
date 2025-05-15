import mongoose from 'mongoose'

const vehicleFilterSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    engine: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

vehicleFilterSchema.index({
  body: 1,
  model: 1,
  year: 1,
  price: 1,
  color: 1,
  transmission: 1,
  mileage: 1,
  engine: 1,
  fuelType: 1,
})

const VehicleFilter = mongoose.model('VehicleFilter', vehicleFilterSchema)

export default VehicleFilter
