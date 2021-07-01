const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    topic: { 
        type: String,
        required: true,
        min : 3,
        max : 255
    },
    description: { 
        type: String,
        required: true,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post',PostSchema);