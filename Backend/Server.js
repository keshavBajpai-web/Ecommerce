import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import CONNECTDB from './config/db.js'
import router from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import addressRoute from './routes/addressRoute.js'
import orderRoute from './routes/order.js'
const port = process.env.PORT
const app = express()
CONNECTDB()   
app.use(cors())
app.use(express.json())

app.use('/api/order',orderRoute)
app.use('/api/address',addressRoute)
app.use('/api/cart',cartRoute) 
app.use('/api/product',productRoute)
app.use('/api/auth',router)

app.get('/',(req,res)=>{ 
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
