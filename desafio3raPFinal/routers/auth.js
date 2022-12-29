import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/sign-in', passport.authenticate('sign-in'), (req, res) => {
  const { user } = req
  if (!req.isAuthenticated()) {
    res
      .cookie('data', JSON.stringify({ message: 'Username or password is invalid', isError: true }), { maxAge: 2000, signed: true })
      .redirect('/loginerror.html')
  }
  //req.session.username = username
  //req.session.isAuth = true
  res.redirect('/producto.html')
})

router.post('/sign-up', passport.authenticate('sign-up'), (req, res) => {
  const { user } = req
  console.log('register -> user', user);
  //res.json({ message: `User ${user.email} was registered.` })
  res.redirect('/index.html')
})

router.post('/sign-out', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/index.html')
  })
})

export default router
