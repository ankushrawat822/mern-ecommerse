const express = require('express')
const { createProduct, fetchAllProducts, fetchProductsById, updateProduct } = require('../controller/Product')
const { fetchBrands } = require('../controller/Brands')
const router = express.Router()

router.post('/' , createProduct)
      .get('/' , fetchAllProducts)
      .get('/:id' , fetchProductsById)
      .patch('/:id' , updateProduct)

// router.get('/' , fetchBrands)
      

exports.router = router