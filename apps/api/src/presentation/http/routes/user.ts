import { Hono } from 'hono'
import { UserController } from '../controllers/user'
import { asyncHandler } from '@/shared/utils/asyncHandler'
import { container } from 'tsyringe'
import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '@/applications/validations/user/create-user.schema'

const router = new Hono()

const userController = container.resolve(UserController)

router.post(
  '/',
  zValidator('json', createUserSchema),
  asyncHandler(async (c) => {
    const body = await c.req.json()
    return userController.createUser(c, body)
  })
)

export default router
