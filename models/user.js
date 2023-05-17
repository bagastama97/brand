"use strict";
const { Model } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Category, {
        through: models.Product,
        foreignKey: "authorId",
        otherKey: "categoryId",
      });
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcryptPass(user.password);
    user.password = hashedPassword;
  });
  return User;
};
