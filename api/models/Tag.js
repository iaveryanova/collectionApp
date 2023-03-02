const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Tag = sequelize.define('Tag', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

    }, {
        tableName: 'tags'
    });
    return Tag
}