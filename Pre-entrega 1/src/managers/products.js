function writeProductsToFile(products) {
    try {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    } catch (err) {
      console.error("Error writing products file:", err);
    }
  }
export class ProductManager {
    
    getPrds(res, req, prds) {    
        let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        let responseProducts = limit ? prds.slice(0, limit) : prds;
        res.send(JSON.stringify(responseProducts));
    }

    getPrdsId(res, req, prds){
        const productId = parseInt(req.params.id);
        const product = prds.find(e => e.id === productId);
      
        if (!product) {
          return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
      
        res.send(JSON.stringify(product));
    }
    
    deletePrds(res, req, prds){  
        const productId = parseInt(req.params.id);
        const product = prds.find(e => e.id === productId);
      
        if (!product) {
          return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
      
        const index = prds.findIndex(product => product.id === productId);
        prds.splice(index, 1);
        writeProductsToFile(prds);
        res.send(JSON.stringify(index));
    }
    upgradePrd(res, req, prds){
        const change = req.body;
        const product = prds.find(product => product.id === parseInt(req.params.id));
      
        if (!product) {
          return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
      
        for (let key in change) {
          if (product.hasOwnProperty(key)) {
            product[key] = change[key];
          }
        }
      
        writeProductsToFile(prds);
        res.send({ status: 'success', product: product });  
    }
    newPrd(res, req, prds){
        const prd = req.body;

        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        const missingFields = requiredFields.filter(field => !prd[field]);
      
        if (missingFields.length > 0) {
          return res.status(400).send({ status: 'error', message: 'Faltan campos requeridos', missingFields });
        } else {
          prd.id = Math.round(Math.random() * 10000);
          prds.push(prd);
          writeProductsToFile(prds);
          res.send({ status: "success" });
        }
      
        if (typeof prd.status === 'undefined') {
          prd.status = true;
        }
    }
    
}