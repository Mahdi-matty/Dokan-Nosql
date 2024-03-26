const express = require("express");
const db = require('./config/connection');
const bodyParser = require('body-parser');
const allRoutes = require('./controllers');
const PORT = process.env.PORT || 3001;
const app = express();
const cwd = process.cwd();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/`, allRoutes)

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server  running on port ${PORT}!`);
    });
  });