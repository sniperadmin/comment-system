const Post = require('../models/post_schema');
const User = require('../models/user_schema');

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
      
    } catch (error) {
      res.status(500).json(error)
    }
  },

  /**
   * 
   * @param {object} req 
   * @param {mixed} res 
   */
  async createPost(req, res) {
    try {
      const post = await Post.create(req.body)
      await post.save();

      /**
       * find publisher
       */
      const user = await User.findById(data.user)
      await user.posts.push({ id: data })
      await user.save();

      res.status(201).json(data)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        throw new Error('post not available')
      }

      data.remove()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
