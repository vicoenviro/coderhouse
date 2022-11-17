import express from 'express'
import session from 'express-session'
import http from 'http'
import MongoStore from 'connect-mongo'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(express.json())
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://vicoenviro:Metallica1002@cluster0.h9yprjj.mongodb.net/session?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 120,
  }),
  secret: '3biXMV8#m5s7',
  resave: true,
  saveUninitialized: true,
}))

const USERNAME='ejrp'
const PASSWORD='pollito1234'


// --------------------------------------- ejemplo 02

const auth = (req, res, next) => {
  console.log('session:', req.session)
  const { isAuth } = req.session
  if (isAuth) {
    next()
  } else{
    res.status(403).send('No tienes permiso para estar acá!!!')
  }
}

app.post('/login', (req, res) => {
  const { username } = req.body
  console.log("nombre:", username)
    req.session.username = username
    req.session.isAuth = true
    res.redirect("/private");
})

app.post('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect("/index.html")
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})

app.get('/private', auth, (req, res) => {
  const { username } = req.session
  res.redirect("/producto.html")
  //res.status(200).send(`Hola ${username}`)
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})