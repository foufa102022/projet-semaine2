const Task = require('../models/Tache');
const jwt = require('jsonwebtoken');

const creatTask = async(req , res) =>{
    try {
        const newTask = await Task.create(req.body);
        res.status(200).json({
            message: "Tache ajouté avec succès.",
            task: newTask
        });
  
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Échec de la création de Tache" });
    }
};
const getTasks = async (req, res) => {
    try {
        const taskes = await Task.find().exec();
        return res.status(200).json({ message: "voila la liste \n ", taskes });
      } catch (err) {
        //console.log(err)
        return res.status(500).json({
          message: "Error interne du serveur",
        });
      }
}; 
const updateTask = async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
        }).exec();
        console.log("updatedTask:", updatedTask);
    
        if (!updatedTask) {
          return res.status(404).json({ success: false, message: "Task not found." });
        }
        return res.status(200).json({ success: true, updatedTask });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal error." });
      }
};
const deleteTask = async(req,res)=>{
    try {
        const idTask = req.params.id;
        const TaskDeleted = await Task.findByIdAndDelete(idTask).exec();
        console.log("TaskDeleted:", TaskDeleted);
    
        if (!TaskDeleted) {
          return res.status(404).json({ success: false, message: "Task not found." });
        }
        return res.status(200).json({ success: true, TaskDeleted });
      }catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal error." });
      }
};
const searchTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Aucune tâche trouvée avec cet ID.' });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Utilisation d'une variable d'environnement
// Messages constants
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';
const login = async (req, res) => {
      try {
      const { username, password } = req.body;
      // Validation des champs requis
      if (!username || !password) {
      throw new Error('Les champs "username" et "password" sont requis.');
      }
     if (username === 'elife' && password === '0000') {
         const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
         res.json({ token, message: SUCCESS_MESSAGE });
         } else {
         res.status(401).json({ message: ERROR_MESSAGE });
         }
         } catch (error) {
         console.error(error.message);
         res.status(500).json({ message: 'Erreur interne du serveur.' });
         }
};

module.exports = {
    creatTask,
    getTasks,
    updateTask,
    deleteTask,
    searchTask,
    login
  };
  