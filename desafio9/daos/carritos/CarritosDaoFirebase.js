import { Schema } from 'mongoose'

import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {

  constructor() {
    console.log('CarritosDaoFirebase Here')
    super('carritos')
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito)
  }
}

export default CarritosDaoFirebase
