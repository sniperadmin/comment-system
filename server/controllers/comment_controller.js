const Comment = require("../models/comment_schema");
const User = require("../models/user_schema");
const Post = require("../models/post_schema");

module.exports = {
  async getComments(req, res) {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
   *
   * @param {object} req
   * @param {mixed} res
   */
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      /**
       * find publisher
       */
      const post = await Post.findById(comment.post);
      const user = await User.findById(comment.user);

      if (!post.comments) {
        post.comments = comment;
      }

      post.comments.push(comment);

      post.user = user;

      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        throw new Error("comment not available");
      }

      data.remove();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
