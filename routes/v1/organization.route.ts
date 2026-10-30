import { Router } from 'express'

import * as organizationController from '@/controllers/organization.controller'
import { bodySchema, paramsSchema, querySchema } from '@/schemas'
import { validate } from '@/validators'

const router = Router()

router.get('/', validate({ query: querySchema }), organizationController.index)

router.get(
  '/:orgId',
  validate({
    params: paramsSchema,
    query: querySchema,
  }),
  organizationController.show
)

router.post('/', validate({ body: bodySchema }), organizationController.store)

export default router
