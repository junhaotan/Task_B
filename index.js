const db_connection = require("./db");
// Import express
const express = require('express');
// Import Body Parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialise the app
const app = express();

// Import routes
const apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

(async () => await db_connection())();

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running application on port " + port);
});

module.exports = app;

exports.handler = function index(event) {
  const response = {
      statusCode: 200,
      body: JSON.stringify(event),
  };
  return response;
};