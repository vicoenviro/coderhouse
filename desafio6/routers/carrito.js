import { Router } from 'express'

const router = Router(Router)

const carrito = []

let siguienteID = 1

//Crear nuevo carrito
router.post('/carrito', (req, res) => {
  let { body : data } = req
  //data = { id: siguienteID, ...data }
  carrito.push(data)
  siguienteID++
  res.status(200).json(data)
})

//Borrar carrito por ID
router.delete('/carrito/:id', (req, res) => {
  let index = req.params.id - 1
  carrito.splice(index,1)  
  res.status(200).json("Eliminado correctamente carrito.")
})

//Obtenet producto de carrito por ID
router.get('/carrito/:id/productos', (req, res) => {
  let car = carrito.filter(it => it.id == req.params.id)
  if(car.length == 0)
    res.status(500).json("Carrito no encontrado")
  else
    res.status(200).json(car[0].productos)
})

//Agregar producto a carrito por ID
router.post('/carrito/:id/productos', (req, res) => {
  let { body : data } = req
  //data = { id: siguienteID, ...data }
  carrito.map(pr =>{
    if(pr.id == req.params.id){
      pr.productos.push(data)    
      return pr.id
    }      
  })    
  res.status(200).json(data)
})

//Obtener todos los carritos
router.get('/carrito', (_, res) => {
  res.status(200).json(carrito)
})

//Borrar producto de carrito por ID
router.delete('/carrito/:id/productos/:idpr', (req, res) => {
  let index  
  carrito.map(pr =>{
    if(pr.id == req.params.id){
      index = req.idpr -1
      pr.productos.splice(index,1)    
      return pr.id
    }      
  })
  res.status(200).json("Eliminado producto de carrito correctamente.")
})

export default router