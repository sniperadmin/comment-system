const Post = require('../models/post_schema');
const User = require('../models/user_schema');

module.exports = {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  async getPosts(req, res) {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
      
    } catch (error) {
      res.status(500).json(error)
    }
  },

  /**
   * create
   * @param {object} req 
   * @param {object} res 
   */
  async createPost(req, res) {
    try {
      const resData = await Post.create(req.body)
      /**
       * find publisher
       */
      const user = await User.findById(resData.user)
      // insert posts into the user object
      if(!user.posts) {
        user.posts = resData
      }

      user.posts.push(resData)

      res.status(201).json(resData)
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(422).json(error)
      } else {
        return res.status(500).json(error)
      }
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
