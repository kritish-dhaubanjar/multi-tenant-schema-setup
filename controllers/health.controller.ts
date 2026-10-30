import type { Request, Response } from 'express'

import { postgresStatus } from '@/handlers/health.handler'

export async function index(_request: Request, response: Response) {
  const status = await postgresStatus()

  response.status(status.postgres === 'up' ? 200 : 503).json(status)
}
