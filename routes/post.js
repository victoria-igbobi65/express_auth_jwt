const express = require('express')
const postController = require('../controllers/post')
const postRouter = express.Router()

postRouter
    .route('/')
    .post(postController.createPost)
    .get(postController.getAllPost)

postRouter
    .route('/:id')
    .get(postController.getPostById)
    .patch(postController.updatePost)
    .delete(postController.deletePostById)

module.exports=postRouter
