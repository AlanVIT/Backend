import { CartManager } from "../dao/managers/carts.manager.js";

const cartManager = new CartManager();

export const CartController = {
    async createCart(req, res) {
        try {
            const newCart = await cartManager.createCart();
            res.status(201).send({ status: 1, msg: 'Carrito añadido con éxito', cartId: newCart._id });
        } catch (error) {
            res.status(500).send({ status: 0, msg: error.message });
        }
    },

    async getPurchase(req, res) {
        try {
            const cartId = req.params.cartId;
            const cart = await cartManager.getCart(cartId);
    
            const unavailableProducts = [];
            let purchaseAllowed = true;
    
            for (const item of cart.items) {
                const product = await Product.findOne({ _id: item.productId });
    
                if (!product) {
                    res.json({ status: 0, msg: `Producto con ID ${item.productId} no encontrado` });
                    return;
                }
    
                if (product.stock < item.quantity) {
                    unavailableProducts.push(product.name);
                    purchaseAllowed = false;
                }
            }
    
            if (!purchaseAllowed) {
                res.json({
                    status: 0,
                    msg: 'No se pudo generar la compra ya que faltan los siguientes productos:',
                    unavailableProducts
                });
            } else {
                res.json({ status: 1, msg: 'Compra generada exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }    
    },

    async getCart(req, res) {
        try {
            const cartId = req.params.cartId;
            let cart = ''
            cartId? cart = await cartManager.getCart(cartId):cart=await cartManager.getCart()
            res.json({ status: 1, cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // async postCart() {
    //     try {
    //         const cart = await cartManager.addCart();
    //         res.json({ status: 1, cart });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    async addProductsToCart(req, res) {
        try {
            const cartId = req.params.cartId;
            const products = req.body.products;
            const cart = await cartManager.addProductsToCart(cartId, products);
            res.status(201).send({ status: 1, msg: 'Carrito actualizado con éxito', cartProducts: cart.products });
        } catch (error) {
            res.status(500).send({ status: 0, msg: error.message });
        }
    },

    async addToCart(req, res) {
        try {
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const cart = await cartManager.addToCart(cartId, productId);
            res.status(201).send({ status: 1, msg: 'Producto añadido al carrito con éxito', cart });
        } catch (error) {
            res.status(500).send({ status: 0, msg: error.message });
        }
    },

    async removeFromCart(req, res) {
        try {
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const cart = await cartManager.removeFromCart(cartId, productId);
            res.status(201).send({ status: 1, msg: 'Producto eliminado del carrito con éxito', cart });
        } catch (error) {
            res.status(500).send({ status: 0, msg: error.message });
        }
    },

    async updateProductQuantity(req, res) {
        try {
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const quantity = req.body.quantity;
            const cart = await cartManager.updateProductQuantity(cartId, productId, quantity);
            res.status(201).send({ status: 1, msg: 'Cantidad de producto actualizada con éxito', cart });
        } catch (error) {
            res.status(500).send({ status: 0, msg: error.message });
        }
    },

    async emptyCart(req, res) {
        const cartId = req.params.cartId;

        try {
            const emptiedCart = await cartManager.emptyCart(cartId);
            res.status(201).send({ status: 1, msg: 'Carro vaciado con éxito', cart: emptiedCart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};