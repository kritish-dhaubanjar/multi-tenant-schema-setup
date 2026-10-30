import type { Request, Response } from 'express'

import { Organization } from '@/models'

export async function index(_request: Request, response: Response) {
  const organizations = await Organization.all()

  response.json({ data: organizations })
}
