import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/products.controller';
import { isAdmin, verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', [verifyToken, isAdmin], createProduct);
router.patch('/:id', [verifyToken, isAdmin], updateProduct);
router.delete('/:id', [verifyToken, isAdmin], deleteProduct);

export default router;
