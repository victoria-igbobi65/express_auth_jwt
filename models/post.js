const mongoose = require('mongoose')


const Schema = mongoose.Schema
const PostSchema = new Schema({
    post:{
        type: String,
        required: [true, 'post body required!']
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    }],
    posted_at: {
        type: Date
    }
})


const Post = mongoose.model('posts', PostSchema)
module.exports=Post