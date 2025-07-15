import app from './src/app'

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed')
  })
  process.exit(0)
})
