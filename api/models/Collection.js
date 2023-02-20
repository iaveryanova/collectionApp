const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const Collection = sequelize.define('Collection', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        desc: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

  }, {
    tableName: 'collections'
  });
  return Collection
}