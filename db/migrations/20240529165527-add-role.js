'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    });
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable(USER_TABLE);
    if (tableDescription.role) {
      await queryInterface.removeColumn(USER_TABLE, 'role');
    }
  },
};
