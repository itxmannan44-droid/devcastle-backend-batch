const bcrypt = require('bcrypt')
const hashPassword = async (password) => {
    try {
        const saltRounds = process.env.SALT_ROUNDS || 10
        const salt = await bcrypt.genSalt(parseInt(saltRounds))
        console.log("Salt:", salt)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    } catch (error) {
        console.error("Error while hashing password:", error)
    }
}
const comparePassword = async (password, hashPassword) => {
    try {
        const isMatched = await bcrypt.compare(password, hashPassword)
        return isMatched
    } catch (error) {
        console.error("Error while comparing password:", error)
    }
}
module.exports = { hashPassword, comparePassword } 