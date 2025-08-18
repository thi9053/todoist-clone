import { Hono } from 'hono'
import fooRouter from './foo'
import userRouter from './user'

const router = new Hono()

router.get('/', (c) => {
  return c.json(
    {
      message: 'Hello World'
    },
    200
  )
})

router.route('/foo', fooRouter)
router.route('/user', userRouter)

export default router
