const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const Comment= sequelize.define('Comment', {

        // name
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        // is_deleted
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

  }, {
    tableName: 'comments'
  });
  return Comment
}