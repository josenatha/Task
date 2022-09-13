const { body, validationResult } = require('express-validator');

// Models
const { Task } = require('../models/task.model');

const taskExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        messague: 'Task Not Found',
      });
    }

    req.task = task;

    next();
  } catch (error) {
    console.log(error);
  }
};

const validStatus = async (req, res, next) => {
  try {
    const { status } = req.params;

    if (status === 'active') {
      req.status = status;
    } else if (status === 'completed') {
      req.status = status;
    } else if (status === 'late') {
      req.status = status;
    } else if (status === 'cancelled') {
      req.status = status;
    } else {
      return res.status(404).json({
        status: 'error',
        messague: `Status ${status} is not valid`,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const messague = errorMessages.join('. ');

    return res.status(404).json({
      status: 'error',
      messague,
    });
  }

  next();
};

const createTaskValidator = [
  body('title')
    .isString()
    .withMessage('title must be a string')
    .notEmpty()
    .withMessage('Title can not be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),
  checkValidations,
];

const updateTaskVlidator = [taskExist, checkValidations];

const deleteTaskValidator = [taskExist, checkValidations];

const checkStatusValid = [validStatus, checkValidations];

module.exports = {
  createTaskValidator,
  updateTaskVlidator,
  deleteTaskValidator,
  checkStatusValid,
};
