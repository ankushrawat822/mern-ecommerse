const express = require('express')

const { fetchCartItems, addToCart , updateCart, deleteCart } = require('../controller/Cart')

const router = express.Router()

// router.post('/' , createProduct)
//       .get('/' , fetchAllProducts)

router.get('/' , fetchCartItems)
      .post('/' , addToCart)
      .patch('/:id' , updateCart)
      .delete('/:id' , deleteCart)
      

exports.router = router