import { Router } from 'express';
import * as ProductController from './productController';

const router = Router();

router
  .get('/fabric/:fabId', ProductController.getAllProductsByFabId)
  .get('/:productId', ProductController.getProductById)
  .post('/', ProductController.createProduct)
  .put('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct);

export default router;
