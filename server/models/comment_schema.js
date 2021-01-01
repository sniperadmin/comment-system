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
}, { timestamps: true });

commentSchema.virtual("users", {
  ref: "users",
  localField: "_id",
  foreignField: "comments"
});

commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });


module.exports = model("comments", commentSchema);
