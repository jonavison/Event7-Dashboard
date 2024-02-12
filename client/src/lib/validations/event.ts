import * as z from 'zod'

export const EventSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),

  type: z
    .enum(['crosspromo', 'liveops', 'app', 'ads'], {
      required_error: 'Must be a valid type.'
    })

    .default('crosspromo'),
  priority: z
    .number()
    .int()
    .min(0, { message: 'Priority can not be below 0' })
    .max(10, { message: 'Priority cannot exceed 10.' }),

  description: z
    .string()
    .min(1, { message: 'Description must be at least 1 character.' })
    .max(255, { message: 'Description cannot exceed 255 characters.' })
})
