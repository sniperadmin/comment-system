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
    }
  }
);

postSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'user'
})

/**
 * set Object & JSON to true
 */
postSchema.set('toObject', { virtuals: true })
postSchema.set('toJSON', { virtuals: true })

module.exports = model('posts', postSchema)
