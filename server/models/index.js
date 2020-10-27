const { model } = require('mongoose');

module.exports = {
  User: model('./user_schema'),
  Post: model('./post_schema'),
  Comment: model('./comment_schema')
}
