const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers[process.env.JWT_HEADER];
        const tokenWithoutBearer = token?.startsWith("Bearer ") ? token.slice(7, token.length) : null;
        if (!tokenWithoutBearer) {
            return res.status(401).json({ message: "Unauthorized User" })
        }
        const user = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)

        const userExist = await User.findById(user.id)
        if (!userExist) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        req.user = user
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Interval Server Error", error: error.message })
    }
}

const authorization = (roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden Access" })
            }
            next()
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Interval Server Error", error: error.message })
        }
    }
}

module.exports = { authenticate, authorization }