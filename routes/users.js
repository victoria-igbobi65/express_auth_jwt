const express = require('express')
const userRouter = express.Router()


const userController = require('../controllers/user')

userRouter
    .route('/')
    .get(userController.getAllUser)

userRouter
    .route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUserById)
module.exports=userRouter
