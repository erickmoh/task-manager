const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// 👇 IMPORTAR MIDDLEWARE
const authMiddleware = require('../middleware/authMiddleware');

// 👇 PROTEGER TODAS LAS RUTAS
router.use(authMiddleware);

// RUTAS
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', taskController.toggleTask);

module.exports = router;