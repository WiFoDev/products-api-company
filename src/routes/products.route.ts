import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/products.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
