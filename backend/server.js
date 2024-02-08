const { sequelize } = require("./models/index");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/item.routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize.sync().then(() => {
  console.log('Base de données synchronisée!');
});
