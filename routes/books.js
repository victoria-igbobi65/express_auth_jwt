const express = require('express')
const bookModel = require('../models/books')
const bookController = require('../controllers/book')

const bookRouter = express.Router()

bookRouter
    .route("/")
    .get(bookController.getAllBook)
    .post(bookController.createBook)

bookRouter
    .route('/:id')
    .get(bookController.getBookById)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook)


module.exports = bookRouter


