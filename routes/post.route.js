const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');

postRouter.post('/', postController.createPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;