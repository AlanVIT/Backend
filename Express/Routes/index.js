import express from 'express'

const app = express();
const server = app.listen(8080, ()=>console.log('Listening in 8080'))

app.use(express.json())
app.use(express.static("/Express"))


