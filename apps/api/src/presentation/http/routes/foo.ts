import { Hono } from 'hono'
import { FooController } from '../controllers/foo'
import { asyncHandler } from '@/shared/utils/asyncHandler'
import { container } from 'tsyringe'
import { createFooSchema } from '@/applications/validations/foo/create-foo.schema'
import { zValidator } from '@hono/zod-validator'

const router = new Hono()

const fooController = container.resolve(FooController)

router.post(
  '/',
  zValidator('json', createFooSchema),
  asyncHandler(async (c) => {
    const body = await c.req.json()
    return fooController.createFoo(c, body)
  })
)

export default router
