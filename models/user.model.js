const mongoose = require('mongoose');
const types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    id: {
        type: types.ObjectId,
        unique: true,
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
        types: types.String
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User