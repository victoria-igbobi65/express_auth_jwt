const mongoose = require('mongoose')
const Post = mongoose.model('posts')
const User = require('../models/users')
const moment = require('moment')



exports.createPost = async (req, res, next) =>{
    try{
        // GET USER ID
        const id = req.user._id

        // FIND USER FROM THE DB
        const user = await User.findById(id)
        
        const newPost = await Post.create({
            post: req.body.post,
            posted_at: moment().toDate()
        })

        // SAVE THE POST ID TO THE USER POSTS LIST
        user.posts = user.posts.concat(newPost._id)
        await user.save()
        
        return res
                .status(200)
                .json({
                    status: true,
                    newPost
                })
    }
    catch(err){
        return res
                .status(400)
                .json({
                    err
                })
    }
}


exports.getPostById = async (req, res, next) => {

    try{
        const { id } = req.params;
        const post = await Post.findById(id);
        return res
                .status(200)
                .json({
                    post,
                });
    }
    catch(err){
        return res
                .status(400)
                .json({
                    err,
        });
    }
}


exports.getAllPost = async (req, res, next) => {
    try{

        const posts = await Post.find({}).populate()
                                // .find()
                                // .populate('users')
                                // .exec()
        

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

exports.deletePostById = async(req, res, next) => {
    const {id} = req.params
    try{
        const post = await Post.deleteOne({id: id})

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
          err,
        });
    }
}