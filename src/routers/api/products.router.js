import { Router } from 'express'
import ProductsController from '../../controllers/product.controller.js'



const router = Router()

router.get('/products', ProductsController.getProducts
   )

 router.post('/products', ProductsController.createProduct)

 router.get('/products/:sid', ProductsController.getProductById)

 router.put('/products/:uid', ProductsController.UpdateProduct)

 router.post('/product/:uid', ProductsController.deleteProduct)

export default router