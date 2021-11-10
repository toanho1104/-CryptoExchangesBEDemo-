'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        id: 1,
        email: 'toanho1104@gmail.com',
        password: '$2a$10$uRaU29PQlYpQKt/Qv8iTreujoCOBF5X753OE7zUxM6/C8QMU2MoOm',
        displayName: 'Toan',
        type: 'user',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'user@gmail.com',
        password: '$2a$10$uRaU29PQlYpQKt/Qv8iTreujoCOBF5X753OE7zUxM6/C8QMU2MoOm',
        displayName: 'Toan',
        type: 'user',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
