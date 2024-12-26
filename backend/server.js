const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://162.19.247.38:80",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "X-Auth-Token", "Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.query.condition) {
    try {
      req.query.condition = JSON.parse(req.query.condition);
    } catch (error) {
      console.error('Invalid JSON in condition:', req.query.condition);
      return res.status(400).send({ message: 'Invalid condition parameter' });
    }
  }
  next();
});

require("./routes/item.routes")(app);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is running on port ${config.SERVER_PORT}.`);
});

sequelize.sync().then(() => {
  console.log('Base de données synchronisée!');
});
