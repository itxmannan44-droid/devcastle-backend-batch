const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category.controller');
const upload = require('../middlewares/multer.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

categoryRouter.post('/', authenticate, upload.single('image'), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/parent/child', categoryController.getParentChildCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.put('/:id', authenticate, upload.single('image'), categoryController.updateCategory);
categoryRouter.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = categoryRouter;