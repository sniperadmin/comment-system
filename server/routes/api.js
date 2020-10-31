const express = require("express");
const passport = require("passport");

const {
  UserController,
  PostController,
  CommentController,
} = require("../controllers");

const router = express.Router();
/**
 * @listens POST /register
 * @listens POST /login
 * @listens GET /me
 * @listens GET /users
 * @listens PUT /users/:id
 */
router
  .post("/register", UserController.registerUser)
  .post("/login", UserController.loginUser)
  .get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.status(200).json({ user: req.user });
  })

  .get("/users", UserController.getUsers)
  .put("/users/:id", passport.authenticate("jwt", { session: false }), UserController.updateUser);
  // .delete("/users/:id", UserController.deleteData);

/**
 * @listens POST /posts
 * @listens GET /posts
 * @listens PUT /posts/:id
 * @listens DELETE /posts/:id
 */
router
  .get("/posts", PostController.getPosts)
  .post("/posts", passport.authenticate("jwt", { session: false }), PostController.createPost)
  .put("/posts/:id", PostController.updatePost)
  .delete("/posts/:id", passport.authenticate("jwt", { session: false }),PostController.deletePost);

/**
 * @listens POST /comments
 * @listens GET /comments
 * @listens PUT /comments/:id
 * @listens DELETE /comments/:id
 */
router
  .get("/comments", CommentController.getComments)
  .post("/comments", passport.authenticate("jwt", { session: false }), CommentController.createComment)
  // .put('/:id', CommentController.)
  .delete("/comments/:id", CommentController.deleteComment);

module.exports = router;
