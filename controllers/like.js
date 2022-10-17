const Post = require('../models/post')
const User = require('../models/users')
const AppError = require('../utils/appError')

exports.likePost = async(req, res, next) => {
    try{
        //ID OF POST
        const {postID} = req.params
        // GET ID OF USER
        const userID = req.user._id
        const post = await Post.findById(postID).exec()
        const user = await User.findById(userID).exec()

        if (!user || !post){
            next(new AppError("User or Post with ID isn't found!"))
        }

        const liked = post.likes(userID)
        if(!liked){
            next(new AppError("There was an issue liking the Post, Try Again!", 500))
        }

        return res
                .status(200)
                .json({
                    status: true,
                    msg: null
                })


    }
    catch(err){
        return res.status(400).json({
          status: false,
          msg: err,
        });
    }
}