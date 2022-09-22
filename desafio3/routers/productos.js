const express = require('express')
const { Router } = express

const router = Router(Router)

const productos = []

let siguienteID = 1

router.post('/productos', (req, res) => {
  let { body : data } = req
  data = { id: siguienteID, ...data }
  productos.push(data)
  siguienteID++
  res.status(200).json(data)
})

router.get('/productos', (_, res) => {
  res.status(200).json(productos)
})

router.get('/productos/:id', (req, res) => {
  let producto = productos.filter(it => it.id == req.params.id)
  if(producto.length == 0)
    res.status(500).json("Producto no encontrado")
  else
    res.status(200).json(producto)
})

router.put('/productos/:id', (req, res) => {
  let data = req.body
  productos.map(pr =>{
    if(pr.id == req.params.id){
      pr.title = data.title
      pr.preci = data.preci
      pr.thumbnail = data.thumbnail       
      return pr.id
    }      
  })    
  res.status(200).json(data)
})

router.delete('/productos/:id', (req, res) => {
  let index = req.params.id - 1
  productos.splice(index,1)  
  res.status(200).json("Eliminado correctamente.")
})

module.exports = router