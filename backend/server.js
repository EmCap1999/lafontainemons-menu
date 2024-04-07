const { sequelize } = require("./models/index");
const config = require("./config/db.config.js")

const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [`http://0.0.0.0:${config.CLIENT_PORT}`],
  })
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
