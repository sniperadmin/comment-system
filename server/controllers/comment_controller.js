const Comment = require('../models/comment_schema');
const User = require('../models/user_schema');

module.exports = {
  async getComments(req, res) {
    try {
      const comments = await Comment.find()
      res.status(200).json(comments)
      
    } catch (error) {
      res.status(500).json(error)
    }
  },

  /**
   * 
   * @param {object} req 
   * @param {mixed} res 
   */
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body)
      await comment.save();

      /**
       * find publisher
       */
      const user = await User.findById(data.user)
      await user.comments.push({ id: data })
      await user.save();

      res.status(201).json(data)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.id)

      if (!comment) {
        throw new Error('comment not available')
      }

      data.remove()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
