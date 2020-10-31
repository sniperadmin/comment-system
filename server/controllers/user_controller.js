"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user_schema");

module.exports = {
  /**
   * registerUser
   * @param {Object} req
   * @param {Object} res
   */
  async registerUser(req, res) {
    let { username, email, password } = req.body;
    try {
      // check for duplicate username
      if (await User.findOne({ username })) {
        return res.status(400).json({
          message: "username already taken!",
        });
      }

      // check for duplicate email
      if (await User.findOne({ email })) {
        return res.status(400).json({
          message: "email already taken!",
        });
      }
    } catch (error) {
      console.log(error);
    }

    /**
     * if conditions passed
     * should now hash password
     */
    let newUser = new User({
      username,
      password,
      email,
    });

    /**
     * when passing all the above conditions
     * should now hash password
     * @param {Number} hashLength
     * @returns {Object} response
     */
    bcrypt.genSalt(10, (err, salt) => {
      /**
       * hash function
       * @param {String} password
       * @param {mixed} salt
       * @param {Function} callback
       * @augments String hash hashed password
       */
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;

        try {
          newUser.save();
          return res.status(201).json({
            success: true,
            message: "created user successfully!",
          });
        } catch (err) {
          if (err.name === "ValidationError") {
            console.error("Error Validating!", err);
            res.status(422).json(err);
          } else {
            console.error(err);
            res.status(500).json(err);
          }
        }
      });
    });
  },

  /**
   * loginUser
   * @param {Object} req
   * @param {Object} res
   */
  async loginUser(req, res) {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "username not found",
        });
      }

      // compare password to the record
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const payload = {
          _id: user._id,
          email: user.email,
          username: user.username,
        };

        // if matches, sign token
        jwt.sign(
          payload,
          "coretabs-competition",
          {
            expiresIn: 604800,
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              message: "logged in successfully",
              user: user,
            });
          }
        );
      } else {
        res.status(404).json({ success: false, message: "wrong password" });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    }
  },

  /**
   * getUsers
   * @param {Object} req
   * @param {Object} res
   */
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("posts");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
   * updateUser
   * @param {Object} req
   * @param {Object} res
   */
  async updateUser(req, res) {
    const user = await User.findById(req.params.id);

    /**
     * when passing all the above conditions
     * should now hash password
     * @param {Number} hashLength
     * @returns {Object} response
     */
    bcrypt.genSalt(10, (err, salt) => {
      /**
       * hash function
       * @param {String} password
       * @param {mixed} salt
       * @param {Function} callback
       * @augments String hash hashed password
       */
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) console.log(err);
        user.password = hash;

        try {
          user.save();
          return res.status(201).json({
            success: true,
            message: "updated user successfully!",
            user
          });
        } catch (err) {
          if (err.name === "ValidationError") {
            console.error("Error Validating!", err);
            res.status(422).json(err);
          } else {
            console.error(err);
            res.status(500).json(err);
          }
        }
      });
    });
  },
};
