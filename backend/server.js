const { sequelize } = require("./models/index");
const config = require("./config/db.config.js")

const express = require("express");
const cors = require("cors");
const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/item.routes")(app);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is running on port ${config.SERVER_PORT}.`);
});

sequelize.sync().then(() => {
  console.log('Base de données synchronisée!');
});
