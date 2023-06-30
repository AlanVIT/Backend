import express from 'express';
import prdsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import mongoose from "mongoose";

const app = express()

app.use(express.json());
app.use('/static', express.static('public'));

app.use('/api/products', prdsRouter);
app.use('/api/carts', cartsRouter);

const MONGO_URL = `mongodb+srv://AlanVT:AlanVT@alanvt.egiux6n.mongodb.net/ecomerce`;

    mongoose.connect(MONGO_URL)
    .then((conn) => {
      console.log(`Conectado con ${MONGO_URL}`);
    })
    .catch((err) => {
      console.log(err);
    });

    app.listen(8080, () => {
      console.log(`Servidor escuchando en el puerto ${8080}`);
    });
  
  
  
  
  
  
  

