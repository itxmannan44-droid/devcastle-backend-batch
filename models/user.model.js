const mongoose = require('mongoose');
const types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    id: {
        type: types.ObjectId,
        autoIncrement: true
    },
    userName: {
        type: types.String,
        required: true,
        unique: true
    },
    email: {
        type: types.String,
        required: true,
        unique: true
    },
    password: {
        type: types.String,
        required: true
    },
    phoneNo: {
        type: types.String
    },
    role: {
        type: types.String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User