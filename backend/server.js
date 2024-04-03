const { sequelize } = require("./models/index");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [`http://0.0.0.0:${process.get.CLIENT_PORT}`],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/item.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize.sync().then(() => {
  console.log('Base de données synchronisée!');
});
