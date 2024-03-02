import { Router } from 'express';
import * as ProductController from './productController';

const router = Router();

router.get('/:fabId', ProductController.getAllProductsByFabId);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
