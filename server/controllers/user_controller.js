'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../models/user_schema');

module.exports = {
  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   */
  registerUser(req, res) {
    let {
      username,
      email,
      password
    } = req.body

    // check for duplicate username
    User.findOne({ username }).then((user) => {
      if (user) {
        return res.status(400).json(
          { message: 'username already taken!' }
        )
      }
    })

    // check for duplicate email
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json(
          { message: 'email already taken!' }
        )
      }
    })

    /**
     * if conditions passed
     * should now hash password
     */
    let newUser = new User({
      username,
      password,
      email
    })

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
        if (err) console.log(err)
        newUser.password = hash

        newUser.save().then((user) => {
          return res.status(201).json(
            { success: true, message: 'created user successfully!' }
          )
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            console.error('Error Validating!', err)
            res.status(422).json(err)
          } else {
            console.error(err);
            res.status(500).json(err)
          }
        })
      })
    })
  },

  loginUser(req, res) {
    /**
     * find user in db
     */
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          return res.status(404).json(
            { success: false, message: 'username not found' }
          )
        }

        // compare password to the record
        bcrypt.compare(req.body.password, user.password)
          .then((isMatch) => {
            // handle if creds match db record
            if (isMatch) {
              const payload = {
                _id: user._id,
                email: user.email,
                username: user.username
              }

              // if matches, sign token
              jwt.sign(payload, "coretabs-competition", {
                expiresIn: 604800
              }, (err, token) => {
                res.status(200).json(
                  {
                    success: true,
                    token: `Bearer ${token}`,
                    message: 'logged in successfully',
                    user: user
                  }
                )
              })
            // handle if creds did not match db record
            } else {
              res.status(404).json(
                { success: false, message: 'wrong credentials' }
              )
            }
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              console.error('Error Validating!', err)
              res.status(422).json(err)
            } else {
              console.error(err);
              res.status(500).json(err)
            }
          })
      })
  },

  getCurrentUser(req, res) {
    passport.authenticate('jwt', { session: false }, () => {
      return res.json({ user: req })
    })
  },
  
  updateData (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
      new: true,
    })
      .then((data) => {
        console.log('User updated!');
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.error('Error Validating!', err);
          res.status(422).json(err);
        } else {
          console.error(err);
          res.status(500).json(err);
        }
      });
  },
  
  deleteData (req, res) {
    User.findById(req.params.id)
      .then((data) => {
        if (!data) {
          throw new Error('User not available');
        }
        return data.remove();
      })
      .then((data) => {
        console.log('User removed!');
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
}
