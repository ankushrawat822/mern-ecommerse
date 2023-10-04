const {Product} = require('../model/Product')

exports.createProduct = async (req , res) =>{
    const product = new Product(req.body)
    const response = await product.save()
         console.log(response)

         try {
             const doc = await product.save()
             res.status(201).json(doc)
            
         } catch (error) {
             console.log(error)
             res.status(400).json(error)
         }
 
}


exports.fetchAllProducts = async (req , res) =>{
   
    let query = Product.find({deleted : {$ne : true}})
    let totalProductQuery = Product.find({deleted : {$ne : true}})

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort] : req.query._order})
       
    }

    if(req.query.category){
        query = query.find({ category : req.query.category})
        totalProductQuery = totalProductQuery.find({ category : req.query.category})
    }

    if(req.query.brand){
        query = query.find({ brand : req.query.brand})
        totalProductQuery = totalProductQuery.find({ brand : req.query.brand})
    }

    // learnings : i used "clone()" because Mongoose no longer allows executing the same query object twice. If you do, you'll get a Query was already executed error. Executing the same query instance twice is typically indicative of mixing callbacks and promises, but if you need to execute the same query twice, you can call Query#clone() to clone the query and re-execute it.

    const totalDoc = await totalProductQuery.count().exec()
    console.log({totalDoc})

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit 
        const page = req.query._page 

        query = query.skip((pageSize * (page - 1))).limit(pageSize)
    }

   

         try {
             const doc = await query.exec()
             res.set('X-Total-Count' , totalDoc)
             res.status(200).json(doc)
            
         } catch (error) {
             console.log(error)
             res.status(400).json(error)
         }
 
}


exports.fetchProductsById = async (req , res) =>{
     const {id} = req.params;
     try {
        const product = await Product.findById(id)
        res.status(200).json(product)
     } catch (error) {
        res.status(400).json(err)
     }
}


exports.updateProduct = async (req , res) =>{
    const {id} = req.params;
    try {
       const product = await Product.findByIdAndUpdate(id , req.body , {new : true})
       res.status(200).json(product)
    } catch (error) {
       res.status(400).json(err)
    }
}