import mongoose from 'mongoose'
import { config } from '@/infrastructure/config'

class DatabaseConnection {
  private static instance: DatabaseConnection
  private isConnected: boolean = false

  private constructor() {
    this.connect()
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Database already connected')
      return
    }

    try {
      const connection = await mongoose.connect(config.mongodbUrl, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false
      })

      this.isConnected = true
      console.log(`MongoDB connected: ${connection.connection.host}`)

      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
        this.isConnected = false
      })

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
        this.isConnected = false
      })

      process.on('SIGINT', async () => {
        await this.disconnect()
        process.exit(0)
      })
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return
    }

    try {
      await mongoose.connection.close()
      this.isConnected = false
      console.log('MongoDB connection closed')
    } catch (error) {
      console.error('Error closing database connection:', error)
      throw error
    }
  }

  public getConnectionState(): boolean {
    return this.isConnected
  }
}

export default DatabaseConnection
