require('dotenv').config();

const { sequelize } = require("./models/index");
const config = require('./config/server.config.js');

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/item.routes")(app);

if (config.PORT === "8080") {
  var corsOptions = {
    "Accept-Encoding": "*",
    "Access-Control-Allow-Origin": "http://162.19.247.38:80",
    "Access-Control-Allow-Headers": ["Origin", "Content-Type", "X-Auth-Token", "Authorization"],
    "Access-Control-Allow-Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    "Allow": ["OPTIONS", "GET", "POST", "DELETE", "PUT"]
  };

  app.use(
    cors(corsOptions)
  );
} else {
  var corsOptions = {
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Accept',
      'X-Auth-Token',
      'Authorization',
      'Cache-Control',
      'Pragma'
    ],
    exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'],
  };

  app.use(
    cors(corsOptions)
  );
  app.listen(config.PORT, () => {
    console.log("Server is listening on port:" + config.PORT);
  });
}

sequelize.sync()
  .then(() => {
    console.log('Database successfully synchronized with the model');
  })
  .catch((error) => {
    console.error('Unable to synchronize the model with the database', error);
  });