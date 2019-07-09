'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      titleDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      
      subDomain: {
        allowNull: false,
        type: Sequelize.STRING
      },
      
      readTime: {
        allowNull:false,
        type: Sequelize.STRING
      },
      postDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      userId:{
        foreignKey:true,
        type:Sequelize.INTEGER
    },
    tag:{
      allowNull:true,
      type:Sequelize.STRING
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};