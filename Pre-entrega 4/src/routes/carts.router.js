import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js";

const router = Router();

router.get('/', CartController.getCart);
router.get('/:cartId', CartController.getCart);
// router.post('/', CartController.postCart);
router.post('/:cid/purchase', CartController.getPurchase);
router.post('/:cartId/products/:productId', CartController.addToCart);
router.put('/:cartId', CartController.addProductsToCart);
router.put('/:cartId/products/:productId', CartController.updateProductQuantity);
router.delete('/:cartId/products/:productId', CartController.removeFromCart);
router.delete('/:cartId', CartController.emptyCart);

export default router;
