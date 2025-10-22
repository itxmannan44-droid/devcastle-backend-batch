const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware')

authRouter.post('/register', upload.single('image'), authController.registerUser);
authRouter.post('/login', authController.loginUser)
authRouter.post('/verifyotp', authController.verifyOtp)
authRouter.put('/updatepassword', authenticate, authController.updatePassword)
authRouter.post('/resendotp', authController.resendOtp)
authRouter.post('/verify-resendotp', authController.verifyResendOtp)
authRouter.post('/resetpassword', authController.resetPassword)

module.exports = authRouter