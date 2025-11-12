const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category.controller');
const upload = require('../middlewares/multer.middleware');

categoryRouter.post('/', upload.single('image'), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/parent/child', categoryController.getParentChildCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.put('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = categoryRouter;