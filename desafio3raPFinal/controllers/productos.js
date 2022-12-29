import ProductoModel from '../models/productos.js'

class ProductoController {
  static create(data) {
    return ProductoModel.create(data)
  }

  static get(query = {}) {
    return ProductoModel.find(query)
  }

  static getByid(id) {
    return ProductoModel.findById(id)
  }

  static uploadById(id, data) {
    return ProductoModel.updateOne({ _id: id }, { $set: data })
  }

  static deleteById(id) {
    return ProductoModel.deleteOne({ _id: id })
  }
}

export default ProductoController