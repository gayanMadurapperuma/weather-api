'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Favorites', 'isFavorite', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    }, {
      after: 'userId' // after option is only supported by MySQL
   });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Favorites', 'isFavorite');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
