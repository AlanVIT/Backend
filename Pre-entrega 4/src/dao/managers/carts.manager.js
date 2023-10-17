import CartsModel from '../models/carts.model.js';
import ProductsModel from '../models/products.model.js';
import { ticketAct } from './products.manager.js';

class CartManager {
  constructor() {
    this.cartModel = CartsModel;
    this.productModel = ProductsModel;
  }

  createCart = async () => {
    try {
      const newCart = await this.cartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error(`No se pudo agregar el carrito: ${error.message}`);
    }
}
  getCart = async (cartId) => {
    let cart = ''
    try {
      if (!cartId) {
      cart = await this.cartModel.find();
      }
      else{
        cart = await this.cartModel.findById(cartId).lean();
      }
      return cart;
    } catch (error) {
      throw new Error(`No se pudo recuperar el carrito: ${error.message}`);
    }
  }

  addToCart = async (cartId, productId) => {
    try {
      console.log(`manager: Adding product with ID ${productId} to cart with ID ${cartId}`);
      let cart = '';
  
      if (cartId) {
        cart = await this.cartModel.findById(cartId);
      } else {
        cart = await this.createCart();
      }
  
      if (!productId) {
        throw new Error('Se requiere ID de producto');
      }
  
      const product = await this.productModel.findById(productId);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      // Busca el producto dentro de la estructura de objetos
      const existingProduct = cart.products.find((item) => item.product._id.toString() === productId);
  
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: product, quantity: 1 });
      }
  
      // Guarda el carrito
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  

  removeFromCart = async (cartId, productId) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      if (!productId) {
        throw new Error('Se requiere ID de producto');
      }
      const existingProduct = cart.products.find((product) => product.product._id.toString() === productId);
      if (!existingProduct) {
        throw new Error('Producto no encontrado en el carrito');
      }
      existingProduct.quantity -= 1;
      if (existingProduct.quantity === 0) {
        cart.products = cart.products.filter((product) => product.product._id.toString() !== productId);
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`No se pudo eliminar el producto del carrito: ${error.message}`);
    }
  }

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      if (!productId) {
        throw new Error('Se requiere ID de producto');
      }
      const existingProduct = cart.products.find((product) => product.product._id.toString() === productId);
      if (!existingProduct) {
        throw new Error('Producto no encontrado en el carrito');
      }
      if (!quantity) {
        throw new Error('Se requiere cantidadd');
      }
      if (quantity <= 0) {
        throw new Error('La cantidad no puede ser cero o negativa');
      }
      existingProduct.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar la cantidad del producto: ${error.message}`);
    }
  }

  emptyCart = async (cartId) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al vaciar el carrito: ${error.message}`);
    }
  }

  addProductsToCart = async (cartId, products) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      if (!products || !Array.isArray(products) || products.length === 0) {
        throw new Error('Lista de productos inválida');
      }
      const existingProducts = cart.products.map((product) => product.product._id.toString());
      const productsToAdd = [];
      const productsToUpdate = [];
      for (const productData of products) {
        const { productId, quantity } = productData;
        if (!productId) {
          throw new Error('Se requiere ID de producto');
        }
        if (!quantity || quantity <= 0) {
          throw new Error('Cantidad no válida');
        }
        const product = await this.productModel.findById(productId);
        if (!product) {
          throw new Error(`Producto no encontrado: ${productId}`);
        }
        if (existingProducts.includes(productId)) {
          const existingProduct = cart.products.find((product) => product.product._id.toString() === productId);
          existingProduct.quantity += quantity;
          productsToUpdate.push(existingProduct);
        } else {
          productsToAdd.push({ product: product, quantity: quantity });
        }
      }
      cart.products.push(...productsToAdd);
      for (const product of productsToUpdate) {
        await product.save({ suppressWarning: true });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar productos al carrito: ${error.message}`);
    }
  }

  getPurchase= async(cartId) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const existingProducts = cart.products.map((product) => product.product._id.toString());

      existingProducts.sort()
      ticketAct.sort()
      existingProducts.forEach(prd =>{
        for(const product of ticketAct){
          if(prd.stock >= product.stock){
            throw new Error('no hay stock suficiente de' + prd);
          }
        } 
      })
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar productos al carrito: ${error.message}`);
    }
  }  
}


export { CartManager };