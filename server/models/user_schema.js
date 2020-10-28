const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "name field is required"],
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      minlength: 7,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      minlength: 6,
      maxlength: 250,
    },
  },
  { timestamps: true }
);

/**
 * @action define schema virtual for posts
 * options included in object:
 *    ref: Model name for Child collection
 *    localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
 *    foreignField: Key name that holds localField value on Child Document
 */
userSchema.virtual("posts", {
  ref: "posts",
  localField: "_id",
  foreignField: "user",
});

/**
 * set Object & JSON to true
 */
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = model("users", userSchema);
