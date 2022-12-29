import { Router } from 'express'
import ProductoController from '../controllers/productos.js'
import twilio from 'twilio'
import sendMail from '../mails.js'

const router = Router(Router)

const accountSid = 'AC24cafdf3b2ea430c330ba53e9171746d';
const authToken = 'aa1c51a18d246ba9a416800f96232f8f';
const client = twilio(accountSid, authToken);

router.post('/productos', async (req, res) => {
  try {
    const { body } = req
    console.log('nuevo prod' ,body)
    const prod = await ProductoController.create(body)
    client.messages 
      .create({ 
         body: 'nuevo pedido de vicoenviro@gmail.com producto:' + prod, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+59172200473' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      sendMail('nuevo pedido de vicoenviro@gmail.com', `Pedido del producto: ${prod}`, 'vicoenviro@gmail.com', null)
    res.redirect('/producto.html')
  } catch (error) {
    next(error)
  }
})

router.get('/productos', async (_, res) => {
  //const data = await productosApi.listarAll()
  res.status(200).json("OK")
})

router.get('/productos/:id', async (req, res) => {
  //let producto = await productosApi.listar(req.params.id)
  //if(producto.length == 0)
    res.status(500).json("Producto no encontrado")
  //else
    //res.status(200).json(producto)
})

router.put('/productos/:id', async (req, res) => {
  //let data = req.body
  //data = { _id: req.params.id, ...data }
  //let update = await productosApi.actualizar(data)  
  //console.log('update: ', update)
  res.status(200).json(data)
})

router.delete('/productos/:id', (req, res) => {
  //productosApi.borrar(req.params.id) 
  res.status(200).json("Eliminado correctamente.")
})

export default router