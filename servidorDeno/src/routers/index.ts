import { Router } from '../../deps.ts'
import { home } from '../handlers/index.ts'
import { getAll, create, getOne } from '../handlers/user.ts'

export const router = new Router()

router.get('/', home)
router.get('/api/users', getAll)
router.get('/api/users/:userId', getOne)
router.post('/api/users', create)