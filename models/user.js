'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    userName:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    image:DataTypes.STRING
  });

  user.associate = function (models) {
    models.user.hasMany(models.post, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }),models.user.hasMany(models.comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return user;
};
