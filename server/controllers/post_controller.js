const { Post } = require('../models');

module.exports = {
  async getPosts (req, res) {
    return await Post.all()
    .then(data => res.status(200).json(data))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  }
}
