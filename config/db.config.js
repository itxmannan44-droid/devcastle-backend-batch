const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STR)
        console.log("Database connected successfully")
        return connection
    } catch (error) {
        console.error("Database Connection Failed", error)
        process.exit(1)
    }
}

module.exports = connectDB