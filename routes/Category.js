const express = require('express')


const { fetchCategory, createCategory } = require('../controller/Category')
const router = express.Router()

// router.post('/' , createProduct)
//       .get('/' , fetchAllProducts)

router.get('/' , fetchCategory)
      .post('/' , createCategory)
      

exports.router = router