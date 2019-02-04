'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reports', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      reportID: {
        type: Sequelize.INTEGER
      },
      employeeId: {
        type: Sequelize.INTEGER
      },
      hoursWorked: {
        type: Sequelize.INTEGER
      },
      jobGroup: {
        type: Sequelize.STRING
      },
      dateWorked: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reports');
  }
};