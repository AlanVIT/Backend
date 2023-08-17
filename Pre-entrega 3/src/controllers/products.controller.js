import { ProductManager } from "../dao/managers/products.manager.js";

const productManager = new ProductManager()

export const getProducts = (req, res) =>{
    const result = productManager.getProducts()
    res.send({result})
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



