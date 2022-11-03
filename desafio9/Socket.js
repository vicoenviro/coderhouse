import { Server } from 'socket.io'
import date from 'date-and-time'

let io

const mensajes = []
const productos = []
let siguienteID = 1

class Socket {
  static init(httpServer) {
    console.log('Configurando el socket')
    io = new Server(httpServer)
    io.on('connection', (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)

      clienteSocket.emit('inicio', { mensaje: mensajes, productos })

      clienteSocket.on('nuevo-mensaje', (data) => {
        let now= new Date()
        let value = date.format(now,'YYYY/MM/DD HH:mm:ss');
        console.log('fecha', value)
        data = { ...data, fecha: value}
        console.log('mensajes 1', mensajes)
        mensajes.push(data)
        console.log('mensajes 2', mensajes)
        io.emit('notificacion', { mensaje: data })
      })

      clienteSocket.on('nuevo-producto', (data) => {
        data = { id: siguienteID, ...data }
        productos.push(data)
        siguienteID++
        console.log('add producto', data)
        io.emit('notificacionprod', { data })
      })

      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

//module.exports = Socket
export default Socket