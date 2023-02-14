import { Application } from '../deps.ts'
import { router } from './routers/index.ts'
import { logger } from './middlewares/logger.ts'

const app = new Application()

app.use(logger)
app.use(router.routes())


console.log('Server runnig in http://localhost:8080')

await app.listen({ port: 8080 })