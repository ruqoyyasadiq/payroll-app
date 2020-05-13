'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn('Reports', 'dateWorked', {
    type: Sequelize.DATEONLY
    // allowNull: false,
   });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn('Reports', 'dateWorked', {
    type: Sequelize.DATE,
    allowNull: false,
   });
  }
};
