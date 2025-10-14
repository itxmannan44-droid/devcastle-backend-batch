const user = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers[process.env.JWT_HEADER];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" })
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Interval Server Error", error: error.message })
    }
}

module.exports = { authenticate }