const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller')

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser)
authRouter.post('/verifyotp', authController.verifyOtp)

module.exports = authRouter