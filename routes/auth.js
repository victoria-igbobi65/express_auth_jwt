const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth')
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), authController.signup 
);

authRouter
    .route('/login')
    .post(authController.login)

module.exports = authRouter;