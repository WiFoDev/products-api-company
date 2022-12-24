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
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
