const Post = require('../models/post')
const User = require('../models/users')
const moment = require('moment')



exports.createPost = async (req, res, next) =>{


    // FIND THE ID OF USER CREATING NEW POST
    const user = await User.findById(req.user._id)

    // SAVE NEW POST TO DB
    const newPost = await Post.create({
        post: req.body.post,
        posted_at: moment().toDate()
    })
    

    //SAVE THE ID OF THE NEW POST TO THE ARRAY OF POSTS BELONGING TO THE USER IN THE USER MODEL
    user.posts = user.posts.concat(newPost._id)
    await user.save()
    
    res
        .status(200)
        .json({
            newPost
        })
}

exports.getPostById = (req, res, next) => {

}
