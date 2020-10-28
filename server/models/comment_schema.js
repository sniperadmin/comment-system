const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  body: {
    type: String,
    required: [true, "comment is required"],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("comments", commentSchema);
