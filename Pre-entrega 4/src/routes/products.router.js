import { Router } from "express";
import { mockingproducts,getProducts,addProduct,getProductById,deleteProduct,updateProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/',getProducts);

router.get('/:productId', getProductById);

router.post('/:productId', addProduct);

router.put('/:productId',updateProduct);

router.delete('/:productId',deleteProduct);

router.get('/mockingproducts', mockingproducts)


export default router;