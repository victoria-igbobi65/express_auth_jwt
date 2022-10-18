const mongoose = require('mongoose')


const Schema = mongoose.Schema
const PostSchema = new Schema({
    post:{
        type: String,
        required: [true, 'post body required!']
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    posted_at: {
        type: Date
    }
})

PostSchema.methods.like = async function(userID){
    if (!userID){
        return false
    }

    this.likes = this.likes.concat(userID)
    return true
}


module.exports = mongoose.model("posts", PostSchema);