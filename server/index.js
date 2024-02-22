const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//connection to db
mongoose.connect("mongodb://127.0.0.1:27017/taches");
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error");
});

db.once("open", () => {
  console.log("Connection with success");
});
app.use(cors());
const routeController = require('./routes/taskRoute');
app.use('/tasks', routeController);
app.listen(port, () => {
  console.log(`Serveur demarré http:localhost:${port}`);
});