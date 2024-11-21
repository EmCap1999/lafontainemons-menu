
const itemController = require("../controllers/item.controller");
const config = require('../config/server.config')

module.exports = function (app) {

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", config.CORS_ORIGIN);
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Auth-Token, Authorization, Cache-Control, Pragma");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      });

    app.post("/createItem",itemController.creatItem );

    app.get("/allItems", itemController.getAllItems)

};
