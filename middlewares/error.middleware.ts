import Joi from 'joi'
import type { Request, Response, NextFunction } from 'express'

import Exception from '../errors/errors'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof Joi.ValidationError) {
    return response.status(422).json({ error: error.details, originalUrl: request.originalUrl })
  }

  if (error instanceof Exception) {
    return response.status(error.status).json({ error, originalUrl: request.originalUrl })
  }

  return response.status(500).json({
    error: {
      status: 500,
      message: 'Internal Server Error',
      details: 'Whoops, looks like something went wrong.',
    },
    originalUrl: request.originalUrl,
  })
}
