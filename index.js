class Contenedor
{
    constructor(archivo){
        this.archivo = archivo
        this.id = 1
        this.fs = require('fs')
    }

    async save(producto){
        console.log('id: '+this.id)
        console.log('titulo add: '+producto.title)
        if(this.id == 1)
        {
            const productoUno = [
                {
                    id: this.id,
                    title: producto.title,
                    price: producto.price,
                    thumbnail: producto.thumbnail
                },
              ]
              this.id++
              await this.escribirArchivo(JSON.stringify(productoUno, null, 2))
        }                 
        else{
            const contenido = await this.leerArchivo()
            const contenidoJSON = JSON.parse(contenido)
            contenidoJSON.push({
                id: this.id,
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail
                })  
            this.id++
            await this.escribirArchivo(JSON.stringify(contenidoJSON, null, 2))                               
        }       
    }

    async escribirArchivo(contenido) {
        try {
          await this.fs.promises.writeFile(this.archivo, contenido, 'utf-8')
        } catch (error) {
          console.log('Ocurrio un error durante la escritura:', error);
          throw new Error(error.message)
        }
    }

    async leerArchivo()
    {
        let data
        try {
            data = await this.fs.promises.readFile(this.archivo, 'utf-8')            
          } catch (error) {
            console.log('Ocurrio un error durante la lectura:', error);
            throw new Error(error.message)
          } 
        return data
    }

    async getById(numberId){
        console.log(numberId)
        const data = await this.leerArchivo()
        const contenidoJSON = JSON.parse(data)
        let producto
        contenidoJSON.forEach(pr => {
            if (pr.id == numberId){ 
                producto = new Producto(pr.title, pr.price, pr.thumbnail)
                return;
            }
    })
        console.log('Objeto ID:'+numberId+' encontrado:', producto.title, producto.price, producto.thumbnail);
        return producto
    }

    async getAll(){
        const data = await this.leerArchivo()
        const contenidoJSON = JSON.parse(data)
        let productos = []
        contenidoJSON.forEach(pr => productos.push(pr))
        //console.log('todos los productos:' ,productos)
        return productos
    }
    
    async deleteById(Number){
        const data = await this.leerArchivo()
        const contenidoJSON = JSON.parse(data)
        contenidoJSON.forEach(pr => {
            if (pr.id == Number){ 
                delete pr.title
                delete pr.price
                delete pr.thumbnail
                delete pr.id
                return;
            }            
        })                     
        await this.escribirArchivo(JSON.stringify(contenidoJSON, null, 2))  

    }
    async deleteAll(){
        const data = await this.leerArchivo()
        const contenidoJSON = JSON.parse(data)
        contenidoJSON.forEach(pr => {
            delete pr.title
            delete pr.price
            delete pr.thumbnail
            delete pr.id
        })                     
        await this.escribirArchivo(JSON.stringify(contenidoJSON, null, 2))  
    }
}

class Producto
{
    constructor(title,price,thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

module.exports = Contenedor;