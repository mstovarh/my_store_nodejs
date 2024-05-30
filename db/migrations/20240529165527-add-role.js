'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable(USER_TABLE);
    if (!tableDescription.role) {
      await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable(USER_TABLE);
    if (tableDescription.role) {
      await queryInterface.removeColumn(USER_TABLE, 'role');
    }
  },
};
