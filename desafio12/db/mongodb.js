import mongoose from 'mongoose'

export const init = async () => {
  try {
    const URL = "mongodb://127.0.0.1:27017/ecommercer"
    await mongoose.connect(URL)
    console.log('Database connected.')
  } catch (error) {
    console.error('Error to connecto to database', error.message)
  }
}