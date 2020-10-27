'use strict';

const User = require('../models/user_schema');
// const Post = require('../models/post_schema');

module.exports = {
  createData (req, res) {
    User.create(req.body)
      .then((data) => {
        console.log('New User Created!', data);
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

  readData (req, res) {
    User.find().populate(['posts'])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
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

// module.exports = {
//   createData,
//   readData,
//   updateData,
//   deleteData,
// };
