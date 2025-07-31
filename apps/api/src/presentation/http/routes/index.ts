import { Hono } from 'hono'
import fooRouter from './foo'

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

export default router
