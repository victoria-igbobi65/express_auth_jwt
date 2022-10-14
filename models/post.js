const mongoose = require('mongoose')


const Schema = mongoose.Schema
const PostSchema = new Schema({
    body:{
        type: String,
        required: [true, 'post body required!']
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})