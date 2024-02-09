const { initModels } = require("../models/init-models");
const { sequelize } = require("../models/index");

const { item } = initModels(sequelize);


//Create an item
exports.creatItem = async (req, res) => {
    try {
        await item.create({
            section: req.body.section,
            subsection: req.body.subsection || null,
            name: req.body.name,
            capacity: req.body.capacity || null,
            price: req.body.price,
            picture: req.body.picture || null,
        });

        res.send({ message: "Le nouvel item a été correctement ajouté!" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Get all Items
exports.getAllItems = async (req, res) => {
    try {
        const { condition } = req.query;

        let queryOptions = {};
        if (condition) {
            queryOptions.where = JSON.parse(condition);
        }

        const allItems = await item.findAll(queryOptions);
        
        res.json(allItems);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
