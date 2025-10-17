const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller')
const { authenticate, authorization } = require('../middlewares/auth.middleware');
const { userEnum } = require('../utils/types/enums.types');

userRouter.get('/fetchAll', authenticate, authorization([userEnum.admin, userEnum.vendor]), userController.getAllUser)
userRouter.get('/fetch', authenticate, userController.getUser)
userRouter.get('/fetch/:id', userController.getUserById)
userRouter.delete('/delete/:id', userController.deleteUser)
userRouter.put('/update/:id', userController.updateUser)

module.exports = userRouter