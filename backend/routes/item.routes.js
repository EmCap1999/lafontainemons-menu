
const itemController = require("../controllers/item.controller");

module.exports = function (app) {

    app.post("/createItem",itemController.creatItem );

    app.get("/allItems", itemController.getAllItems)

};
