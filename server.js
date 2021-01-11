const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up static paths
app.use(express.static('public'));

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});