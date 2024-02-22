const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
//login 
router.post('/login', taskController.login);

//get list of tasks
router.get('/list', taskController.getTasks);

//create a new task 
router.post('/ajouter', taskController.creatTask);

//update a task
router.put('/modifier/:id', taskController.updateTask);

//delete a task 
router.delete('/supprimer/:id', taskController.deleteTask);

//search a one task 
router.get('/:id', taskController.searchTask);

module.exports = router;

