const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const ThemeCollection = sequelize.define('ThemeCollection', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

  }, {
    tableName: 'theme_collections'
  });
  return ThemeCollection
}