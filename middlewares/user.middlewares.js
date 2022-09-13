const { body, validationResult } = require('express-validator');

// Model
const { User } = require('../models/User.model');

const userExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        messague: 'User Not Found',
      });
    }

    req.user = user;

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

const createUserValidator = [
  body('name')
    .isString()
    .withMessage('Name must be a String')
    .notEmpty()
    .withMessage('Name can not be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a String')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations,
];

const updateUserValidator = [
  userExist,
  body('name')
    .isString()
    .withMessage('Name must be a String')
    .notEmpty()
    .withMessage('Name can not be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  checkValidations,
];

const deleteUserValidator = [userExist, checkValidations];

module.exports = {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
};
