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

exports.getPostById = async (req, res, next) => {

    const {id} = req.params
    try{
        const post = await Post.find({id: id})

        return res
                .status(200)
                .json({
                    status: true,
                    post
                })
    }
    catch(err){
        return res
                .status(400)
                .json({
                    status: false,
                    err
                })
    }

}

exports.getAllPost = async (req, res, next) => {
    try{

        const posts = await Post
                                .find()
                                .populate('users')
        

        return res
                .status(200)
                .json({
                    status: true,
                    posts
                })
    }
    catch(err){
        return res
                .status(400)
                .json({
                    status: false,
                    err,
                });
    }
}


exports.updatePost = async (req, res, next) => {
    const {id} = req.params
    const newPost = req.body

    try{
        // FIND POST USINNG ID
        const post = await Post
                            .find({id: id})
                            .populate('users')

        if (!post){
            return res
                    .status(404)
                    .json({
                        status: false,
                        msg: `post with ID ${id} doesn't exist!`
                    })
        }

        post.post = newPost
        await post.save()

        return res
                .status(200)
                .json({
                    status: true,
                    post
                })
    }
    catch(err){
        return res
                .status(400)
                .json({
                    status: false,
                    err,
                });
    }
}