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
    otp: {
        type: types.Number
    },
    otpExpiredAt: {
        type: types.Date
    },
    isVerified: {
        type: types.Boolean,
        default: false
    },
    role: {
        type: types.String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    },
    tempToken: {
        type: types.String
    },
    profileImage: {
        type: types.String,
        set(value) {
            return `${process.env.BASE_URL}${value}`
        }
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User