import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongoDB.URI)

class ContenedorMongoDB {
  constructor(modelName, schema) {
      this.collection = mongoose.model(modelName, schema)
  }

  listar(id) {
    return this.collection.find({_id: {$eq: id}})
  }

  async listarAll() {
    return this.collection.find({})
  }

  async guardar(obj) {
    const result = await this.collection.create(obj)
    return result
  }

  async actualizar(elem) {
    //console.log('elem: ', elem)
    return this.collection.updateOne({_id: {$eq: elem._id}},{$set: elem})
  }

  async borrar(id) {
    return this.collection.deleteOne({ _id: id })
  }

  async borrarAll() {
    return this.collection.deleteMany()
  }
}

export default ContenedorMongoDB