const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
    }
})

module.exports = multer({ storage: storage })