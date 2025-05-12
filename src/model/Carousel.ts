import mongoose from 'mongoose'

const carouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    singleTitle: {
      type: String,
      required: true,
    },
    singleImage: {
      type: String,
      required: true,
    },
    singleDescription: {
      type: String,
      required: true,
    },
    socials: {
      facebook: { type: String },
      instagram: { type: String },
      x: { type: String },
      youtube: { type: String },
    },
  },
  { timestamps: true },
)

const Carousel = mongoose.model('Carousel', carouselSchema)

export default Carousel
