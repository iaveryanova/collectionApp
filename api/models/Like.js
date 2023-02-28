const { Sequelize, DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const Like = sequelize.define('Like', {
  }, {
    tableName: 'likes'
  });
  return Like
}