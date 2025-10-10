const connectDB = require('./config/db.config')
const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public'))
app.use('/user', require('./routes/user.route'))
app.use('/post', require('./routes/post.route'))

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
})
