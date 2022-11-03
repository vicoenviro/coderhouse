import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        console.log('ProductosDaoArchivo Here')
        super('productos.json')
    }
}

export default ProductosDaoArchivo
