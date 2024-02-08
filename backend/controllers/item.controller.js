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
        const allItems = await item.findAll();
        res.json(allItems);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Get One item
// exports.getOneitem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const oneitem = await pool.query("SELECT * FROM item WHERE item_id = $1", [id]);
//         res.json(oneitem.rows[0]);

//     } catch (err) {
//         console.error(err.message)
//     }
// }


//Delete a item

// exports.deleteOneitem = async (req, res) => {
//     try {
//         await Item.destroy({
//             where: {
              
//             }
//           });
//     } catch (err) {
//         console.error(err.message)

//     }
// }