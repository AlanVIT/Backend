import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js";

const router = Router();

router.post('/', CartController.createCart);
// remplazar post por get
router.post('/:cid/purchase', CartController.getPurchase);
router.get('/:cartId', CartController.getCart);
router.put('/:cartId', CartController.addProductsToCart);
router.post('/:cartId/products/:productId', CartController.addToCart);
router.delete('/:cartId/products/:productId', CartController.removeFromCart);
router.put('/:cartId/products/:productId', CartController.updateProductQuantity);
router.delete('/:cartId', CartController.emptyCart);

export default router;
