import { z } from 'zod'

export const querySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
})

export const paramsSchema = z.object({
  orgId: z.string().min(1),
})

export const bodySchema = z.object({
  id: z.number().int().positive().optional(),
  orgId: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
})
