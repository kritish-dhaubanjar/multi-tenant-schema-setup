import { Router } from 'express'

import * as organizationController from '@/controllers/organization.controller'

const router = Router()

router.get('/', organizationController.index)

export default router
