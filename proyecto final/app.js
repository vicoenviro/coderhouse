import express from 'express'
import http from 'http'
import { fileURLToPath } from 'url'
import path from 'path'
import Socket from './Socket.js'

import indexProductos from './routers/productos.js'
import indexCarrito from './routers/carrito.js'

const app = express()

const PORT = process.env.NODE_PORT || 8080
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(await Promise.resolve('Configurando servidor...'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/', indexProductos)
app.use('/api/', indexCarrito)

/**
 * Create HTTP server.
 */
const service = http.createServer(app)
Socket.init(service)

service.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})

export default service
