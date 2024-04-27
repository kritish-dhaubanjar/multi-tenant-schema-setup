import Joi from 'joi'
import { HEADERS } from '../constants/headers.constant'

export const headerSchema = Joi.object({
  [HEADERS['x-tenant-id']]: Joi.string().required(),
}).unknown(true)
