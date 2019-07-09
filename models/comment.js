'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    
    postId: DataTypes.INTEGER,
    commentData: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    commentBy:DataTypes.STRING,
    userId:DataTypes.INTEGER
      
  });

  comment.associate = function(models) {
    models.comment.belongsTo(models.post,{
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }),
    models.comment.belongsTo(models.user,{
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
 };

  return comment;
};
