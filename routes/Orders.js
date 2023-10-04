const express = require('express')
const { fetchOrdersItems, addToOrders, updateOrders, deleteOrders, fetchAllOrders } = require('../controller/Orders')



const router = express.Router()

// router.post('/' , createProduct)
//       .get('/' , fetchAllProducts)

router.get('/user/:userId' , fetchOrdersItems)
      .post('/' , addToOrders)
      .patch('/:id' , updateOrders)
      .delete('/:id' , deleteOrders)
      .get('/' , fetchAllOrders)
      

exports.router = router