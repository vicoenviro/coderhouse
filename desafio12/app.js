import express from 'express'
import session from 'express-session'
import http from 'http'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import router from './routers/index.js'
import { init } from './db/mongodb.js'
import UserModel from './models/user.js'
import { fileURLToPath } from 'url'
import path from 'path'

await init()

const app = express()

const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

passport.use('sign-in', new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        console.log(`User with ${email} not found.`)
        return done(null, false)
      }
      if (password !== user.password) {
        console.log('Invalid Password')
        return done(null, false)
      }
      done(null, user)
    })
    .catch(error => {
      console.log('Error in sign-in', error.message)
      done(error)
    })
}))

passport.use('sign-up', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, (req, email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (user) {
        console.log(`User ${email} already exists.`)
        return done(null, false)
      }
      return UserModel.create(req.body)
    })
    .then(newUser => {
      console.log(`User ${newUser.email} registration succesful.`)
      done(null, newUser)
    })
    .catch(error => {
      console.log('Error in sign-up', error.message)
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then(user => done(null, user))
    .catch(done)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: '3!$H4s5K36#s',
  resave: false, 
  saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})