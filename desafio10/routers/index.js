import { Router } from 'express'
import { faker } from '@faker-js/faker/locale/es'

const router = Router()

const { name, internet, commerce } = faker

function getProducts(count = 5) {
  const productos = []
  for (let index = 0; index < parseInt(count); index++) {
    productos.push({
      id: index + 1,
      title: commerce.productName(),
      preci: commerce.price(),
      thumbnail: internet.avatar(),
    })
  }
  return productos
}

router.get('/', (req, res, next) => {
  try {
    console.log('redirec vico..')
    res.send('OK')
  } catch (error) {
    next(error)
  }
})

router.get('/productos-test', (req, res) => {
  const { query } = req
  res.json(getProducts(query.cant))
})


export default router
