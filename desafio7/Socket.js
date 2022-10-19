import { Server } from 'socket.io'
import date from 'date-and-time'
import {
  insertProducts,
  getProducts,
} from './db/mysql.js'

import {
  insertMensajes,
  getMensajes,
} from './db/sqlite.js'


let io



class Socket {
  static init(httpServer) {
    console.log('Configurando el socket')
    io = new Server(httpServer)
    io.on('connection', async (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)
      let mesages = await getMensajes()
      let productos = await getProducts()

      clienteSocket.emit('inicio', { mensaje: mesages, productos })

      clienteSocket.on('nuevo-mensaje', async (data) => {
        let now= new Date()
        let value = date.format(now,'YYYY/MM/DD HH:mm:ss');
        data = { ...data, fecha: value}
        await insertMensajes(data)
        let mesages = await getMensajes()
        let productos = await getProducts()
        //console.log('mensajes:',mesages)
        io.emit('notificacion', { mensaje: mesages, productos })
      })

      clienteSocket.on('nuevo-producto', async (data) => {
        await insertProducts(data)
        let mesages = await getMensajes()
        let productos = await getProducts()
        //console.log('productos:', productos)
        io.emit('notificacionprod', { mensaje: mesages, productos })
      })

      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

//module.exports = Socket
export default Socket