const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
const { verifyToken, generateToken } = require("../helper/jwt");
class Controller {
  static async findAllProducts(req, res, next) {
    try {
      const find = await Product.findAll({
        include: { model: Category },
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        message: find,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createProducts(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;
      const find = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imgUrl: imgUrl,
        categoryId: categoryId,
        authorId: authorId,
      });
      res.status(201).json({
        statusCode: 201,
        message: find,
      });
    } catch (err) {
      next(err);
    }
  }
  static async findOneProducts(req, res, next) {
    const { id } = req.params;
    try {
      const find = await Product.findByPk(id);
      if (find) {
        res.status(200).json({
          statusCode: 200,
          message: find,
        });
      } else throw { name: "Not Found" };
    } catch (err) {
      next(err);
    }
  }
  static async deleteProducts(req, res, next) {
    const { id } = req.params;
    try {
      const find = await Product.findAll({ where: { id: id } });
      console.log(find);
      if (!find) throw { name: "Not Found" };
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: `${find[0].name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async findAll(req, res, next) {
    try {
      const allCategories = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        message: allCategories,
      });
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      if (createUser) {
        res.status(201).json({
          id: createUser.id,
          password: createUser.password,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "user not found" };
      }

      const passwordHash = findUser.password;
      const chekPassword = comparePass(password, passwordHash);
      if (!chekPassword) {
        throw { name: "user not found" };
      }
      const token = generateToken({
        id: findUser.id,
        username: findUser.username,
      });
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
