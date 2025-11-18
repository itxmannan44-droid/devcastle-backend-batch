const user = require('../models/user.model')
const path = require('path')
const fs = require('fs')

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
const deleteImages = (imageUrl) => {
    try {
        if (!imageUrl) return

        if (imageUrl.startsWith(process.env.BASE_URL)) {
            imageUrl = imageUrl.replace(process.env.BASE_URL, '');
        }

        const fullPath = path.join('public', imageUrl)
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath)
            console.log('Image deleted successfully')
        } else {
            console.log('Image not found at path:', fullPath)
        }
        return
    } catch (error) {
        console.error('Error deleting image:', error)
    }
}

module.exports = { generateOtp, checkAdminUser, deleteImages }
