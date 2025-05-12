import app from './server'
import connectDB from './config/db'

const PORT = process.env.PORT || 3000
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log('Error starting server', error)
  }
}

startServer()
