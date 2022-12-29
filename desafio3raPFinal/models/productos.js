import mongoose, { Schema } from 'mongoose'

const producto = new Schema({
  title: { type: String, require: true },
  preci: { type: Number, require: true },
  thumbnail: { type: String},
  stock: { type: Number},
})

export default mongoose.model('Producto', producto)
