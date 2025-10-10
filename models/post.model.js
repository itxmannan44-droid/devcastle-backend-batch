const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        autoIncrement: true
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    content: {
        type: Schema.Types.String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema)