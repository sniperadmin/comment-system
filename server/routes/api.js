const express = require('express');
const passport = require('passport');

const {
  UserController,
  PostController,
  CommentController
} = require('../controllers')

const router = express.Router()
/**
 * @listens POST /register
 * @listens POST /login
 * @listens GET /users
 * @listens PUT /users/:id
 * @listens DELETE /users/:id
 */
router
  .post('/register', UserController.registerUser)
  .post('/login', UserController.loginUser)
  .get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('api request: ', req)
      return res.status(200).json({ user: req.user })
    }
  )
  .get('/users', UserController.loginUser)
  .put('/users/:id', UserController.updateData)
  .delete('/users/:id', UserController.deleteData)

/**
 * @listens POST /posts
 * @listens GET /posts
 * @listens PUT /posts/:id
 * @listens DELETE /posts/:id
*/
router
  .get('/posts', PostController.getPosts)
  .post('/posts', PostController.createPost)
  // .put('/:id', PostController.)
  .delete('/posts/:id', PostController.deletePost)

/**
 * @listens POST /comments
 * @listens GET /comments
 * @listens PUT /comments/:id
 * @listens DELETE /comments/:id
*/
router
  .get('/comments', CommentController.getComments)
  .post('/comments', CommentController.createComment)
  // .put('/:id', CommentController.)
  .delete('/comments/:id', CommentController.deleteComment)

module.exports = router
