// Models
const { User } = require('../models/User.model');
const { Task } = require('../models/task.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      include: { model: Task, attributes: ['id', 'title', 'status'] },
    });

    res.status(200).json({
      status: 'Success',
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: 'Succes',
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({
      name,
      email,
    });

    res.status(204).json({ status: 'Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'inactive' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
