import mongoose, { Schema } from 'mongoose'

const user = new Schema({
  fistname: { type: String, require: true },
  lastname: { type: String, require: true },
  password: { type: String, require: true },
  age: { type: Number, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
  status: { type: String, default: 'active', enum: ['active', 'inactive'] },
}, { timestamps: true })

export default mongoose.model('User', user)
