import { Router } from 'express'
import {
  productosDao as productosApi,
  carritosDao as carritosApi
} from '../daos/index.js'

const router = Router(Router)

const carrito = []

let siguienteID = 1

//Crear nuevo carrito
router.post('/carrito', (req, res) => {
  let { body : data } = req
  //data = { id: siguienteID, ...data }
  carritosApi.guardar(data)
  siguienteID++
  res.status(200).json(data)
})

//Borrar carrito por ID
router.delete('/carrito/:id', (req, res) => { 
  carritosApi.borrar(req.params.id)
  res.status(200).json("Eliminado correctamente carrito.")
})

//Obtenet producto de carrito por ID
router.get('/carrito/:id/productos', async (req, res) => {
  let car = await carritosApi.listar(req.params.id) 
  if(car.length == 0)
    res.status(500).json("Carrito no encontrado")
  else
    res.status(200).json(car[0].productos)
})

//Agregar producto a carrito por ID
router.post('/carrito/:id/productos', async (req, res) => {
  let { body : data } = req
  let car = await carritosApi.listar(req.params.id)
  car[0].productos.push(data)
  console.log('cars: ', car)  
  let update = await carritosApi.actualizar(car) 
  //console.log('update cars: ', update)  
  res.status(200).json(car)
})

//Obtener todos los carritos
router.get('/carrito', (_, res) => {
  carrito = carritosApi.listarAll()
  res.status(200).json(carrito)
})

//Borrar producto de carrito por ID
router.delete('/carrito/:id/productos/:idpr', async (req, res) => {
  let index  
  let car = await carritosApi.listar(req.params.id)
  index = req.idpr -1
  car[0].productos.splice(index,1) 
  let update = await carritosApi.actualizar(car)  
  res.status(200).json("Eliminado producto de carrcarto correctamente.")
})

export default router