import type { Request, Response } from 'express'

import { Organization } from '@/models'

export async function index(_request: Request, response: Response) {
  const organizations = await Organization.all()

  response.json({ data: organizations })
}

export function show(request: Request, response: Response) {
  response.json({ data: { ...request.params, ...request.query } })
}

export function store(request: Request, response: Response) {
  response.status(201).json({ data: request.body })
}
