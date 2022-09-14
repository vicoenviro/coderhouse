(function (run) {
  if(!run) return

  const express = require('express')

  const app = express()

  const Contenedor = require('./index')
  const productos = new Contenedor('./productos.txt')
  const PORT = 8080

  const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })

  server.on("error", error => console.log(`Error en servidor ${error}`))

  app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al servidor express de Victor Villarroel</h1>')
  })

  app.get('/productos', (req, res) => {      
    
    let prod = productos.getAll().then( processLogin).catch(loginFail)
    function processLogin( prod) {
      res.send(prod)
    }
    function loginFail( err) {
        console.log("login failed: " + err);
    }    
  })  

  app.get('/productoRandom',(req,res)=>{
    let id = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    let prod = productos.getById(id).then( processLogin).catch(loginFail)
    function processLogin( prod) {
      res.send(prod)
    }
    function loginFail( err) {
        console.log("login failed: " + err);
    }  
} )
})(true);