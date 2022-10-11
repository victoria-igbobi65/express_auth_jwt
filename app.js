const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error')

const booksRoute = require('./routes/books');
const authRoute = require('./routes/auth');




require("./authentication/auth") // Signup and login authentication middleware
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoute);
app.use('/books', passport.authenticate('jwt', { session: false }), booksRoute);


// renders the home page
app.get('/', (req, res) => {
    res.send('Welcome to the book API');
});

// Handle errors.
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 400))
    
});

app.use(globalErrorHandler)





module.exports=app;