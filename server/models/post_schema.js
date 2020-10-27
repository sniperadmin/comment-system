const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title field is required']
    },
    description: {
      type: String,
      required: [true, 'description field is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      { type: Schema.Types.ObjectId, ref: 'Comment' }
    ]
  }
);

module.exports = model('posts', postSchema);
