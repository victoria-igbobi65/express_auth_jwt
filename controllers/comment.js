const Comment = require('../models/comment')
const Post = require('../models/post')
const AppError = require('../utils/appError')
const moment = require('moment')


exports.writeComment = async (req, res, next) => {
    try{
        const { id } = req.params;
        const newComment = req.body.comment;

        const comment = await Comment.create({
          comment: newComment,
          date: moment().toDate(),
        }).exec();

        const post = await Post.findById(id).exec();

        if (!post) {
          next(new AppError("Post with ID doesn't exist!", 404));
        }

        post.comments = post.comments.concat(newComment._id);
        await post.save();

        return res.status(200).json({
          status: false,
          newComment,
        });
    }
    catch(err){
        return res.status(400).json({
            status: false,
            err
        })
    }
}

exports.deleteComment = async (req, res, next) => {
    const {postID, commentID} = req.params

    //const post = await Post.findById(postID)
    const comment = await Comment.findById(commentID)

    if (!comment){
        return next(new AppError("comment with thus ID doesn't exist!", 404))
    }

    Comment.findByIdAndDelete(commentID)
    Post.updateOne({_id: postID}, {$pull: {comments: commentID}})
    
}