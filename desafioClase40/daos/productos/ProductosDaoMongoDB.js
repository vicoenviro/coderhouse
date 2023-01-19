import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        console.log('ProductosDaoMongoDB Here')
        super('Producto', new Schema({
          id: { type: Number, require: true },
          title: { type: String, require: true },
          preci: { type: Number, require: true },
          thumbnail: { type: String},
          stock: { type: Number},
        }))
    }
}

export default ProductosDaoMongoDB
