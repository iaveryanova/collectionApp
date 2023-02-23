const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const ItemCollections = sequelize.define('ItemCollections', {

        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        
        desc: {
            type: DataTypes.TEXT,
            allowNull: false
        },


        field_integer_1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        field_integer_2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        field_integer_3: {
            type: DataTypes.INTEGER,
            allowNull: true
        },


        field_string_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        field_string_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        field_string_3: {
            type: DataTypes.STRING,
            allowNull: true
        },


        field_bool_1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },
        field_bool_2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },
        field_bool_3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },


        field_text_1: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        field_text_2: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        field_text_3: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },

        
        field_date_1: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        field_date_2: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        field_date_3: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },


        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

  }, {
    tableName: 'items_collections'
  });
  return ItemCollections
}
