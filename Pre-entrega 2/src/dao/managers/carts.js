import cartModel from "../schemas/carts.schema.js";

export class cartManager {

  constructor(){
    this.cartModel = cartModel;
  }
    getCarts = async()=> {    
      try {
        const cart = await this.cartModel.find({});
        return cart;
      } catch (error) {
        console.log(error);
      }
    }

    getCartsId=async(id)=>{
      try {
        const cartData = await this.cartModel.findOne({ _id: id });  
        return cartData;
      } catch (error) {
        console.log(error);
      }
    }

    cartPrd = async(res, req, carts)=>{
      const cartId = parseInt(req.params.cid);
      const productId = req.params.pid;
    
      const cart = carts.find(e => e.id === cartId);
      if (parseFloat(cartId) != cartId || parseFloat(productId) != productId) {
        return res.status(400).send({ status: 'error', message: 'Los IDs deben ser números' });
      }
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
      }
    
      if (!cart.products) {
        cart.products = [];
      }
    
      cart.products.push(parseInt(productId));
    
      writeCartsToFile(carts);
      res.send({ status: 'success' });
    }
    newCart = async(body)=>{
      try {
        const newCart = await this.cartModel.create(body);
        return newCart;
      } catch (error) {
        console.log(error);
      }
    }

    //Nuevos comandos

    //Borrar prd del cart
    deleteCartPrd = async(res, req, carts)=>{
      const cartId = parseInt(req.params.cid);
      const productId = req.params.pid;
    
      const cart = carts.find(e => e.id === cartId);
      if (parseFloat(cartId) != cartId || parseFloat(productId) != productId) {
        return res.status(400).send({ status: 'error', message: 'Los IDs deben ser números' });
      }
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
      }
    
      if (!cart.products) {
        cart.products = [];
      }

      cart.products.filter(product => product != parseInt(productId));
    
      writeCartsToFile(carts);
      res.send({ status: 'success' });
    }
  
    //Actualizar el cart

    updateCartsId=async(req)=>{
      try {
        const id = req.params.id
        const body = req.body
        const updatedProduct = await this.cartModel.updateOne({ _id: id}, body)
        return updatedProduct
      } catch (error) {
        console.log(error)
      }
    }

    //Actualizar cant de prds en cart
    updateCartsId=async(req)=>{
      try {
        const id = req.params.id
        const body = req.body
        const updatedProduct = await this.cartModel.updateOne({ _id: id}, {quantity:body})
        return updatedProduct
      } catch (error) {
        console.log(error)
      }
    }

  }