import express from 'express';
const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})