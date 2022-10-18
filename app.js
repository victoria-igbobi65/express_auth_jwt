const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error')

const commentRoute = require('./routes/comments')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')
const userRoute = require('./routes/users')



require("./authentication/auth") // Signup and login authentication middleware
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', authRoute);
app.use('/post/:id/comment', passport.authenticate('jwt', { session: false }), commentRoute)
app.use('/post', passport.authenticate('jwt', { session: false }), postRoute)
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);


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