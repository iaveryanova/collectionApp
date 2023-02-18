const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const Collection = sequelize.define('Collection', {

        // user_id
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: User(sequelize),
        //         key: 'id'
        //     }
        // },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // theme
        // theme_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: ThemeCollection(sequelize),
        //         key: 'id'
        //     }
        // },

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