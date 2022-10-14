const { default: mongoose } = require('mongoose');
const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const CommentSchema = new Schema({
    Body:{
        type: String,
        required: [true, 'Post must have a body!']
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'please provide user ID!']
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: [true, 'post ID required!']
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

// Export the model
const Comment = moogoose.model('posts', CommentSchema); //collection name is Books. This is the name of the collection in the database
module.exports=Comment