import type { Request, Response, NextFunction } from 'express'

import { Tenant } from '../models'
import storage from '../providers/storage.provider'
import { headerSchema } from '../schemas/header.schema'
import { HEADERS } from '../constants/headers.constant'

import Exception from '../errors/errors'
import { ExpectationException } from '../constants/errors.constant'

export async function validateHeaders(request: Request, _response: Response, next: NextFunction) {
  try {
    const { error } = headerSchema.validate(request.headers)

    if (error) {
      throw error
    }

    const tenantId = request.headers[HEADERS['x-tenant-id']]?.toString() ?? ''
    const tenant = await Tenant.get(tenantId)

    if (!tenant) {
      throw new Exception(ExpectationException, 1000)
    }

    const store = new Map()
    store.set('schema', tenant?.schema)

    storage.run(store, next)
  } catch (error) {
    next(error)
  }
}
