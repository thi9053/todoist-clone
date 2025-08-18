import { Hono } from 'hono'
import { asyncHandler } from '@/shared/utils/asyncHandler'
import { container } from 'tsyringe'
import { zValidator } from '@hono/zod-validator'
import { loginSchema } from '@/applications/validations/auth/login.schema'
import { AuthController } from '../controllers/auth'
import { introspectSchema } from '@/applications/validations/auth/introspect.schema'

const router = new Hono()

const authController = container.resolve(AuthController)

router.post(
  '/login',
  zValidator('json', loginSchema),
  asyncHandler(async (c) => {
    const body = await c.req.json()
    return authController.login(c, body)
  })
)

router.post(
  '/introspect',
  zValidator('json', introspectSchema),
  asyncHandler(async (c) => {
    const body = await c.req.json()
    return authController.introspect(c, body)
  })
)

export default router
