import z from 'zod'

export const carouselSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  tags: z.array(z.string()),
  category: z.string().min(1),
  slug: z.string().min(1),
  singleTitle: z.string().min(1),
  singleImage: z.string().min(1),
  singleDescription: z.string().min(1),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    x: z.string().optional(),
    youtube: z.string().optional(),
  }),
})
