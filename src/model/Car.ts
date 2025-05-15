import mongoose from 'mongoose'
import slugify from 'slugify'
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
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
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
)

carSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true })
  next()
})

carSchema.index({ name: 1 })
carSchema.index({ category: 1 })
carSchema.index({ tags: 1 })

const Car = mongoose.model('Car', carSchema)

export default Car
