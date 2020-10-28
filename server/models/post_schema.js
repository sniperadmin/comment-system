const { Schema, model } = require("mongoose");

/**
 * @param {object} options => title, description, user
 * all params are required
 */
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "title field is required"],
  },
  description: {
    type: String,
    required: [true, "description field is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

/**
 * @action define schema virtual for posts
 * options included in object:
 *    ref: Model name for Child collection
 *    localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
 *    foreignField: Key name that holds localField value on Child Document
 */
postSchema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "post",
});

/**
 * set Object & JSON to true
 */
postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

module.exports = model("posts", postSchema);
