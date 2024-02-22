// API Tâches
const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

// Securiser les API
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/tasks");
const db = mongoose.connection;
db.on("error", () => {
  console.log("Erreur");
});
db.once("open", () => {
  console.log("Connexion avec succès");
});
const Task = require("./models/task");

// Clé secrète pour la création et la vérification des JWT

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware pour protéger les routes nécessitant une authentification


// Retourne la liste complète de toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Retourne les détails d'une tâche spécifique
app.get('/tasks/:id', async (req, res) => {
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
});

// Permet de créer une nouvelle tâche
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: 'Tâche créée avec succès.', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Permet de mettre à jour les détails d'une tâche existante
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Aucune tâche trouvée avec cet ID.' });
    }
    res.json({ message: 'Tâche mise à jour avec succès.', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Permet de supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Aucune tâche trouvée avec cet ID.' });
    }
    res.json({ message: 'Tâche supprimée avec succès.', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

