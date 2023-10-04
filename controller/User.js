const {User} = require('../model/User')

exports.fetchUserById = async (req , res)=>{
     const {id} = req.params
     try {
         const user = await User.findById(id)
         res.status(200).json(user)
     } catch (error) {
        res.status(400).json(error)
     }
}


// // create categorr
// exports.createUser = async (req , res)=>{ 

//     const user = new User(req.body)

//     try {
//         const doc = await user.save()
//         res.status(201).json(doc)
//     } catch (error) {
//        res.status(400).json(error)
//     }
// }


exports.updateUser = async (req , res) =>{
    const {id} = req.params;
    try {
       const user = await User.findByIdAndUpdate(id , req.body , {new : true})
       res.status(200).json(user)
    } catch (error) {
       res.status(400).json(err)
    }
}


// exports.loginUser = async (req , res)=>{
  
//     try {
//         const user = await User.findOne({email : req.body.email}  ).exec()
//         console.log({user})
//         if(!user){
//             res.status(401).json({message : "no such email exists"})
//         }
//        else if(user.password === req.body.password){
//             res.status(200).json({id : user.id , email : user.email , name : user.name , addresses : user.addresses})
//         }else{
//             res.status(400).json({message  : "invalid credentials"})
//         }
       
//      } catch (error) {
//         res.status(400).json(error)
//      }
// }