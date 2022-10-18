const express = require('express')

const commentController = require('../controllers/comment')
const  commentRouter = express.Router()
commentRouter
    .route('/')
    .post(commentController.writeComment)

commentRouter
    .route('/:id')
    .delete(commentController.deleteComment)


module.exports=commentRouter