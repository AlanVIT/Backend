import { Router } from "express";
import { getProducts,addProduct,getProductById,deleteProduct,updateProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/',getProducts);

router.get('/:productId', getProductById);

router.post('/', addProduct);

router.put('/:productId',updateProduct);

router.delete('/:productId',deleteProduct);

export default router;