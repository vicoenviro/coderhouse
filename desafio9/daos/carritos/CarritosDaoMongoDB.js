import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class CarritosDaoMongoDB extends ContenedorMongoDB {

  constructor() {
    console.log('CarritosDaoMongoDB Here')
    super('Carrito', new Schema({
      productos: { type: [], require: true },
    }))
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito)
  }
}

export default CarritosDaoMongoDB
