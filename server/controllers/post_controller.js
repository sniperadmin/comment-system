const Post = require("../models/post_schema");
const User = require("../models/user_schema");

module.exports = {
  /**
   * get
   * @param {object} req
   * @param {object} res
   */
  async getPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate({ path: "comments", populate: { path: "user", select: "username" } })
        .populate("user", "username");

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
   * create
   * @param {object} req
   * @param {object} res
   */
  async createPost(req, res) {
    try {
      // get user identity and add it to the body
      req.body.user = req.user.id;

      const post = await Post.create(req.body);
      /**
       * find publisher
       */
      const user = await User.findById(post.user);
      // insert posts into the user object
      if (!user.posts) {
        user.posts = post;
      }

      user.posts.push(post);

      res.status(201).json(post);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(422).json(error);
      } else {
        return res.status(500).json(error);
      }
    }
  },

  /**
   * update
   * @param {object} req
   * @param {object} res
   */
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) throw new Error("post not available");

      await post.updateOne(req.body);
      return res
        .status(201).json({
          success: true,
          message: "updated post successfully!",
        });
    } catch (err) {
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    }
  },

  /**
   * delete
   * @param {object} req
   * @param {object} res
   */
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        throw new Error("post not available");
      }

      if (req.user.id === String(post.user)) {
        post.remove();
        res.status(200).json(post);
      }
      else {
        res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
