import { ProductManager } from "../dao/managers/products.manager.js";

const productManager = new ProductManager()

export const getProducts = (req, res) =>{
    const { limit = 10, page = 1, sort, query } = req.query;
// Agregar limite a los requests
    if(query !== 'asc' ||query !== 'des'){
      res.status(500).send('query debe ser asc o des');
    } 
    try {
        const result = productManager.paginate(filter, {limit:limit, page:page}).sort({fieldName: sort, sortOrder: query });
        res.send(result);
      } catch (error) {
        res.status(500).send('Error en la consulta');
      }
}

export const addProduct = (req, res) =>{
    productManager.addProduct(req.body)
    res.send(productManager.addProduct(req.body))
}

export const getProductById = (req, res) =>{
    productManager.getProductById(req.params.id)
    res.send(productManager.getProductById(req.params.id))
}

export const deleteProduct = (req, res) =>{
    productManager.deleteProduct(req.body)
    res.send(productManager.deleteProduct(req.body))
}

export const updateProduct = (req, res) =>{
    const result = productManager.updateProduct()
    res.send({result})
}



