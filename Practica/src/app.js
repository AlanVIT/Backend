import express from 'express'
import cors from 'cors'
import displayRoutes from 'express-routemap'

import router from './routers/users.router.js'
import mongoose, { connection } from 'mongoose'

const PORT = 5000
const DB_PORT = 5000
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const collection = mongoose.connect(MONGO_URL).then((conn)=>{

    console.log(
        `conect with mongo, URL: ${MONGO_URL}`
    )

}).catch((err)=>{
    console.log(`err:${err}`);
})

app.use('/api/alive', (req, res )=>{

    res.json({ok:true, message:"API ALIVE"})
})

app.listen(PORT, ()=>{
    console.log('Listening on ' + PORT)
    displayRoutes(app)
})