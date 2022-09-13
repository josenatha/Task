const express = require('express');

// Controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');

// Middlewares
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require('../middlewares/user.middlewares');

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.post('/', createUserValidator, createUser);
usersRoutes.patch('/:id', updateUserValidator, updateUser);
usersRoutes.delete('/:id', deleteUserValidator, deleteUser);

module.exports = { usersRoutes };
