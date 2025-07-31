import { Hono } from 'hono'

const router = new Hono()

router.get('/', (c) => {
  return c.json(
    {
      message: 'Hello World'
    },
    200
  )
})

export default router
