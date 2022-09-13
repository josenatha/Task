const express = require('express');

// Controllers
const {
  getAllTasks,
  getTaskByStatus,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controllers');

// Middlewares
const {
  createTaskValidator,
  updateTaskVlidator,
  deleteTaskValidator,
  checkStatusValid,
} = require('../middlewares/task.middlewares');

const tasksRoutes = express.Router();

tasksRoutes.get('/', getAllTasks);
tasksRoutes.post('/', createTaskValidator, createTask);
tasksRoutes.get('/:status', checkStatusValid, getTaskByStatus);
tasksRoutes.patch('/:id', updateTaskVlidator, updateTask);
tasksRoutes.delete('/:id', deleteTaskValidator, deleteTask);

module.exports = { tasksRoutes };
