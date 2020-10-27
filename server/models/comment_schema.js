const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'comment is required'],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
);

module.exports = model('comments', commentSchema);
