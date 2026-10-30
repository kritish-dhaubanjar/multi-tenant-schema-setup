import { Router } from 'express'

import organizationRoutes from '@/routes/v1/organization.route'

const router = Router()

router.use('/organizations', organizationRoutes)

export default router
