const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller')
const { authenticate } = require('../middlewares/auth.middleware')

userRouter.post('/register', userController.registerUser);
userRouter.get('/fetch',authenticate, userController.getUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/fetch/:id', userController.getUserById)
userRouter.delete('/delete/:id', userController.deleteUser)
userRouter.put('/update/:id', userController.updateUser)

module.exports = userRouter