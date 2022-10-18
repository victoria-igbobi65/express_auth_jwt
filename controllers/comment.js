const mongoose = require('mongoose')

const Comment = require('../models/comment')
const Post = mongoose.model('posts')
const AppError = require('../utils/appError')
const moment = require('moment')

exports.writeComment = async (req, res, next) => {
  res.end(req.url)
    // try{


    //     console.log(req.url)
    //     const { id } = req.params;
    //     const newComment = req.body.comment;
        
    //     console.log(id)
    //     const comment = await Comment.create({
    //       comment: newComment,
    //       user_id: req.user_id,
    //       date: moment().toDate(),
    //     }).exec();

    //     const post = await Post.findById(id).exec();

    //     if (!post) {
    //       next(new AppError("Post with ID doesn't exist!", 404));
    //     }

    //     post.comments = post.comments.concat(newComment._id);
    //     await post.save();

    //     return res.status(200).json({
    //       status: false,
    //       comment,
    //     });
    // }
    // catch(err){
    //     return res.status(400).json({
    //         status: false,
    //         err
    //     })
    // }
}

exports.deleteComment = async (req, res, next) => {
  console.log('Hey')

//   const {postID, commentID} = req.params
//  //const post = await Post.findById(postID)
//   const comment = await Comment.findById(commentID)
//   if (!comment){
//     return next(new AppError("comment with thus ID doesn't exist!", 404))
//   }
//   Comment.findByIdAndDelete(commentID)
//   Post.updateOne({_id: postID}, {$pull: {comments: commentID}})

//   return res.status(200).json({
//     status: false,
//     message: null
//   })
    
}