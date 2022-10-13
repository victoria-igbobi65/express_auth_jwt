const passport = require("passport");
const jwt = require("jsonwebtoken");
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')
require("dotenv").config();



exports.signup = async (req, res, next) => {

  //SEND A MAIL TO A USER ANYTIME THEY SIGNUP 
  //MESSAGE TO SEND TO USER
  const message = `Hey champ ${req.user.username}!\nWelcome to our site, we hope you make the most of your experience!\nWe would be rooting for you from over here!`
  
  try{

    // MAIL FUNCTION
    await sendEmail({
      email: req.user.email,
      subject: 'Welcome to Mira site',
      message
    })

    // SUCCESS RESPONSE
    res.json({
       message: "Signup successful",
       user: req.user,
     });


  }
  catch(err){
    // ERROR BLOCK
    return next(new AppError('There was an error sending the email, Try again later!', 500))
  }
 
};



exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new AppError("Username or password is incorrect", 400));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        //You store the id and email in the payload of the JWT.
        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
        // DO NOT STORE PASSWORDS IN THE JWT!
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
