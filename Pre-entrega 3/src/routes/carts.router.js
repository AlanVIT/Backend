import { Router } from "express";
import { createCart,getPurchase,getCart,addProductsToCart,addToCart,removeFromCart,updateProductQuantity,emptyCart } from "../controllers/carts.controller.js";

const router = Router();

router.post('/', createCart);
router.get('/:cid/purchase', getPurchase);
router.get('/:cartId', getCart);
router.put('/:cartId', addProductsToCart);
router.post('/:cartId/products/:productId', addToCart);
router.delete('/:cartId/products/:productId', removeFromCart);
router.put('/:cartId/products/:productId', updateProductQuantity);
router.delete('/:cartId', emptyCart);

export default router;
