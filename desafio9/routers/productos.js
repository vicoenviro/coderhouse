import { Router } from 'express'
import {
  productosDao as productosApi,
  carritosDao as carritosApi
} from '../daos/index.js'

const router = Router(Router)

const productos = []

let siguienteID = 1

router.post('/productos', (req, res) => {
  let { body : data } = req
  //data = { id: siguienteID, ...data }
  productosApi.guardar(data)
  //productos.push(data)
  siguienteID++
  res.status(200).json(data)
})

router.get('/productos', async (_, res) => {
  const data = await productosApi.listarAll()
  res.status(200).json(data)
})

router.get('/productos/:id', async (req, res) => {
  let producto = await productosApi.listar(req.params.id)
  if(producto.length == 0)
    res.status(500).json("Producto no encontrado")
  else
    res.status(200).json(producto)
})

router.put('/productos/:id', async (req, res) => {
  let data = req.body
  data = { _id: req.params.id, ...data }
  let update = await productosApi.actualizar(data)  
  console.log('update: ', update)
  res.status(200).json(data)
})

router.delete('/productos/:id', (req, res) => {
  productosApi.borrar(req.params.id) 
  res.status(200).json("Eliminado correctamente.")
})

export default router