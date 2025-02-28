
const itemController = require("../controllers/item.controller");

module.exports = function (app) {

    app.post("/createItem", itemController.createItem);

    app.get("/allItems", itemController.getAllItems);

};
