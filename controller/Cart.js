const {Cart} = require('../model/Cart')

exports.fetchCartItems = async (req , res)=>{
       const {user} = req.query  
     try {
         const cart = await Cart.find({user : user}).populate([{ path: "product", strictPopulate: false }]).populate([{ path: "user", strictPopulate: false }])
         res.status(200).json(cart)
         console.log(cart)
     } catch (error) {
        res.status(400).json(error)
        console.log(error)
     }
}


// create categorr
exports.addToCart = async (req , res)=>{ 

    const cart = new Cart(req.body)

    try {
        const doc = await cart.save()
        const result = await doc.populate('product')
        res.status(201).json(result)
    } catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}


// update cart
exports.updateCart = async (req , res)=>{ 
    
    const {id} = req.params;
    console.log("test console " + id)
    
  
    try {
        const cart = await Cart.findByIdAndUpdate(id  , req.body , {new : true})
        const result = await cart.populate('product')
        res.status(201).json(result)
    } 
     
    catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}



// delete cart
exports.deleteCart = async (req , res)=>{ 

    const {id} = req.params;

    try {
        const doc = await Cart.findByIdAndDelete(id)
       
        res.status(201).json(doc)
    } catch (error) {
       res.status(400).json(error)
       console.log(error)
    }
}