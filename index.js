const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { createProduct } = require('./controller/Product')
const cors = require('cors')
const server = express()

const productsRouter = require('./routes/Products')
const brandsRouter = require('./routes/Brands')
const categoryRouter = require('./routes/Category')
const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart')
const ordersRouter = require('./routes/Orders')
const path = require("path")

// middelware
server.use(express.static(path.resolve(__dirname , 'dist')))
server.use(cors({
     exposedHeaders : ['X-Total-Count']
}))
server.use(express.json())
server.use('/products' , productsRouter.router) 
server.use('/brands' , brandsRouter.router)
server.use('/category' , categoryRouter.router)
server.use('/users' , userRouter.router)
server.use('/auth' , authRouter.router)
server.use('/cart' , cartRouter.router)
server.use('/orders' , ordersRouter.router)



main().catch(error => console.log(error))
async function main() {
     await mongoose.connect(process.env.MONGODB_URL)
     console.log('database started')
} 

server.get('/' , (req , res)=>{
     res.json({"msg" : "ok"})
})

// create product

// server.post('/product' , createProduct)


server.listen(process.env.PORT , ()=>{
    console.log('server started')
})