// Models
const { Task } = require('../models/task.model');
const { User } = require('../models/User.model');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: { model: User },
    });

    res.status(200).json({
      status: 'Success',
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaskByStatus = async (req, res) => {
  try {
    const { status } = req;

    const tasks = await Task.findAll({
      where: { status },
      include: { model: User },
    });

    res.status(200).json({
      status: 'Success',
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, UserId, startDate, limitDate } = req.body;

    const newTasks = await Task.create({
      title,
      UserId,
      startDate,
      limitDate,
    });

    res.status(201).json({
      status: 'Success',
      newTasks,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;

    const status = equateDates(task.limitDate, finishDate);

    await task.update({
      finishDate,
      status,
    });

    res.status(201).json({ status: 'Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({
      status: 'cancelled',
    });

    res.status(201).json({ status: 'Cancelled' });
  } catch (error) {
    console.log(error);
  }
};

const equateDates = (limitDate, finishDate) => {
  const deadLine = Date.parse(limitDate);
  const endTask = Date.parse(finishDate);

  if (deadLine > endTask) {
    return 'completed';
  } else {
    return 'late';
  }
};

module.exports = {
  getAllTasks,
  getTaskByStatus,
  createTask,
  updateTask,
  deleteTask,
};
