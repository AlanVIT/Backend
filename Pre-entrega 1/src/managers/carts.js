function writeProductsToFile(products) {
    try {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    } catch (err) {
      console.error("Error writing products file:", err);
    }
  }
export class cartManager {
    
    getCarts(res, carts) {    
      res.send(JSON.stringify(carts));
    }

    getCartsId(res, req, carts){
      const cartId = parseInt(req.params.id);
      const cart = carts.find(e => e.id === cartId);
    
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
      }
    
      res.send(JSON.stringify(cart.products));
    }

    cartPrd(res, req, carts){
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
    newCart(res, req, carts){
      const cart = req.body;

      const requiredFields = ['products', 'quantity'];
      const missingFields = requiredFields.filter(field => !cart[field]);
    
      if (missingFields.length > 0) {
        return res.status(400).send({ status: 'error', message: 'Faltan campos requeridos', missingFields });
      } else {
        cart.id = Math.round(Math.random() * 10000);
        carts.push(cart);
        writeCartsToFile(carts);
        res.send({ status: "success" });
      }
    
      if (typeof cart.status === 'undefined') {
        cart.status = true;
      }
    }
    
}