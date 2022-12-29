import { Router } from 'express'
import users from './users.js'
import auth from './auth.js'
import productos from './productos.js'

const router = Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/prod', productos)

export default router