const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
    },
    password: {
      type: String,
      required: [true, 'password field is required'],
    },
    posts: [
      { type: Schema.Types.ObjectId, ref: 'Post' }
    ],
    comments: [
      { type: Schema.Types.ObjectId, ref: 'Comment' }
    ]
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);
