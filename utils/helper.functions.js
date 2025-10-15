const user = require('../models/user.model')

const generateOtp = () => {
    return Math.floor(785210 + Math.random() * 90)
}
const checkAdminUser = async (roles) => {
    try {
        const isAdmin = await user.findOne({ roles: roles })
        if (isAdmin) return true
        else return false
    } catch (error) {
        console.error(error)
    }
}

module.exports = { generateOtp }