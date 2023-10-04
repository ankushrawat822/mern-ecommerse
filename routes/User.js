const express = require('express')
const { createUser, fetchUserById, updateUser } = require('../controller/User')
const router = express.Router()

router.patch('/:id' , updateUser)
    .get('/:id' , fetchUserById)
      
// router.get('/' , fetchBrands)
      

exports.router = router