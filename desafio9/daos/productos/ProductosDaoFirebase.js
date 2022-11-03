import { Schema } from 'mongoose'

import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        console.log('ProductosDaoFirebase Here')
        super('productos')
    }
}

export default ProductosDaoFirebase
