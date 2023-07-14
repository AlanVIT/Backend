import express from 'express';

import mongoose from "mongoose";

const app = express()

app.use(express.json());
app.use('/static', express.static('public'));


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