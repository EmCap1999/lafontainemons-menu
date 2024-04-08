const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    itemId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subsection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_pkey",
        unique: true,
        fields: [
          { name: "itemId" },
        ]
      },
    ]
  });
};
