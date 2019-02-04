'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reportID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hoursWorked: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobGroup: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateWorked: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};
