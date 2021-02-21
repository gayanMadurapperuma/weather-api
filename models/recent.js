'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recent.belongsTo(models.User, {foreignKey: 'userId'});
      Recent.belongsTo(models.City, {foreignKey: 'cityId'});
      // define association here
    }
  };
  Recent.init({
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Recent',
  });
  return Recent;
};