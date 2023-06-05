import express from 'express';
const app = express();

import { ProductManager } from './class.js';

const productM = new ProductManager();
const products = productM.getProducts()

app.get('/products/:id', (req, res) => {
    let prd = products.filter(e => e.code ===  parseInt(req.params.id))
    prd = JSON.stringify(prd)
    res.send(`<h1>${prd}<h1/>`)
});
app.get('/products', (req, res) => {
    let limit = parseInt(req.query.limit);
    let newArry = products.slice(0, limit);
    let prd = JSON.stringify(newArry);
    res.send(`<h1>${prd}</h1>`);
});
app.get(`/products`, (req, res) => {
    console.log("Prueba", products);
    res.send(products)
});
app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})