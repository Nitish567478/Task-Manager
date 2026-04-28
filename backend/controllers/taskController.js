const { Task } = require('../models');

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    const task = await Task.create({
      title,
      description,
      status: status || 'Pending',
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or you do not have permission' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;

    await task.update(updates);

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or you do not have permission' });
    }

    await task.destroy();

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
};

