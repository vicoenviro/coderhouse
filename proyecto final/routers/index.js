import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  try {
    console.log('redirec vico..')
    res.send('OK')
  } catch (error) {
    next(error)
  }
})

export default router
