import express from 'express';
import Formidable from 'express-formidable';
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

import { 
    addProduct,updateProductDetails,removeProduct,fetchProducts
} from '../controllers/productController.js'

const router = express.Router();

router.route('/').get(fetchProducts).post(authenticate, authorizeAdmin,Formidable(), addProduct);
router.route('/:id').put(authenticate, authorizeAdmin, checkId, Formidable(), updateProductDetails);
router.route('/:id').delete(authenticate, authorizeAdmin, Formidable(), removeProduct);

export default router;