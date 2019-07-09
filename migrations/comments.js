'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        foreignKey:true,
        type: Sequelize.INTEGER
      },
      userId: {
        foreignKey:true,
        type: Sequelize.INTEGER
      },
      commentData: {
        allowNull: false,
        type: Sequelize.STRING
      },
      commentBy:{
        type: Sequelize.STRING
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};