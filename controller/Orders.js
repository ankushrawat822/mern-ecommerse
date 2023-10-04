const {Orders} = require('../model/Orders')

exports.fetchOrdersItems = async (req , res)=>{
       const {userId} = req.params  
     try {
         const orders = await Orders.find({user : userId})
         res.status(200).json(orders)
         console.log(orders)
     } catch (error) {
        res.status(400).json(error)
        console.log(error)
     }
}


// create categorr
exports.addToOrders = async (req , res)=>{ 

    const orders = new Orders(req.body)

    try {
        const doc = await orders.save()
        // const result = await doc.populate('product')
        res.status(201).json(doc)
    } catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}


// update cart
exports.updateOrders = async (req , res)=>{ 
    const {id} = req.params;
  
    try {
        const orders = await Orders.findByIdAndUpdate(id , req.body , {new : true})
        
        res.status(201).json(orders)
    } catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}



// delete cart
exports.deleteOrders = async (req , res)=>{ 

    const {id} = req.params;

    try {
        const doc = await Orders.findByIdAndDelete(id)
       
        res.status(201).json(doc)
    } catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}






// fetch all orders
exports.fetchAllOrders = async (req , res) =>{
   
    let query = Orders.find({deleted : {$ne : true}})
    let totalOrdersQuery = Orders.find({deleted : {$ne : true}})

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort] : req.query._order})
       
    }

    // if(req.query.category){
    //     query = query.find({ category : req.query.category})
    //     totalProductQuery = totalProductQuery.find({ category : req.query.category})
    // }

    // if(req.query.brand){
    //     query = query.find({ brand : req.query.brand})
    //     totalProductQuery = totalProductQuery.find({ brand : req.query.brand})
    // }

    // learnings : i used "clone()" because Mongoose no longer allows executing the same query object twice. If you do, you'll get a Query was already executed error. Executing the same query instance twice is typically indicative of mixing callbacks and promises, but if you need to execute the same query twice, you can call Query#clone() to clone the query and re-execute it.

    const totalDoc = await totalOrdersQuery.count().exec()
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