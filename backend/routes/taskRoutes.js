const express = require('express');
const router = express.Router();
const { createTask, getMyTasks, updateTask, deleteTask } = require('../controllers/taskController');
const verifyToken = require('../middlewares/auth');
const { createTaskValidation, updateTaskValidation } = require('../middlewares/validation');

router.post('/', verifyToken, createTaskValidation, createTask);
router.get('/', verifyToken, getMyTasks);
router.put('/:id', verifyToken, updateTaskValidation, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;

