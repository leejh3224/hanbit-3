import { Router } from 'express'
import csrf from 'csurf'
import productControl from './product.controller'

const router = Router()
const csrfProtection = csrf({ cookie: true })

router.post('/', productControl.create)

router.get('/limit/:limit', productControl.readMany)

router.get('/:productId', productControl.read)

router.put('/:productId', productControl.update)

router.delete('/:productId', productControl.delete)

export default router