const express = require('express');

const {
  UserController
} = require('../controllers');

const router = express.Router();

router
  .post('/', UserController.createData)
  .get('/', UserController.readData)
  .put('/:id', UserController.updateData)
  .delete('/:id', UserController.deleteData);

module.exports = router;
