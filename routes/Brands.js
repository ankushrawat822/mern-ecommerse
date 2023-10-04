const express = require('express')

const { fetchBrands, createBrand } = require('../controller/Brands')
const router = express.Router()

// router.post('/' , createProduct)
//       .get('/' , fetchAllProducts)

router.get('/' , fetchBrands)
      .post('/' , createBrand) 
      

exports.router = router