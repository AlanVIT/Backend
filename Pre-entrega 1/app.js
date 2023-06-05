import express from 'express';
import prdsRouter from './src/routers/products.router.js';
import cartsRouter from './src/routers/carts.router.js';

const app = express()

app.use(express.json());
app.use('/static', express.static('public'));

app.use('/api/products', prdsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})


