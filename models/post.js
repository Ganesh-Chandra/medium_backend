'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    titleDescription:  DataTypes.STRING,
 
    subDomain:  DataTypes.STRING,
    userId:DataTypes.INTEGER,
    readTime:  DataTypes.STRING,
    postDescription:  DataTypes.STRING,

    tag: DataTypes.STRING
  });

   post.associate = function (models) {
    models.post.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }),
    models.post.hasMany(models.comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return post;
};
