const express = require('express');

const {
  UserController,
  PostController,
  CommentController
} = require('../controllers');

const router = express.Router();

router
  .post('/users', UserController.createData)
  .get('/users', UserController.readData)
  .put('/users/:id', UserController.updateData)
  .delete('/users/:id', UserController.deleteData);
  
router
  .get('/posts', PostController.getPosts)
  .post('/posts', PostController.createPost)
  // .put('/:id', PostController.)
  .delete('/posts/:id', PostController.deletePost);

  router
  .get('/comments', CommentController.getComments)
  .post('/comments', CommentController.createComment)
  // .put('/:id', CommentController.)
  .delete('/comments/:id', CommentController.deleteComment);

module.exports = router;
