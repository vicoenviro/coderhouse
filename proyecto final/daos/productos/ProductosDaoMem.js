import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js"

class ProductosDaoMem extends ContenedorMemoria {
  constructor() {
    console.log('ProductosDaoMem Here')
    super()
  }
}

export default ProductosDaoMem
