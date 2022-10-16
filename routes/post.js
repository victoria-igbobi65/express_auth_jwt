const express = require('express')
const postController = require('../controllers/post')
const postRouter = express.Router()

postRouter
    .route('/')
    .post(postController.createPost)

module.exports=postRouter
