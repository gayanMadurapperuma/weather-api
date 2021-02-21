'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenHash: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};