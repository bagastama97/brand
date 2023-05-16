const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
const { verifyToken, generateToken } = require("../helper/jwt");
class Controller {
  static async findAllProducts(req, res, next) {
    try {
      const find = await Product.findAll();
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
        message: req.body,
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
      if (find.length > 0) {
        const del = await Product.destroy({ where: { id: id } });
        res.status(200).json({
          statusCode: 200,
          message: `${find[0].name} success to delete`,
        });
      } else throw { name: "Not Found" };
    } catch (err) {
      next(err);
    }
  }
  static async findAll(req, res, next) {
    try {
      const allProducts = await Product.findAll();
      const allCategories = await Category.findAll();
      if (allCategories && allProducts) {
        let result = [];
        result.push(allProducts);
        result.push(allCategories);
        res.status(200).json({
          statusCode: 200,
          message: result,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const hasPassword = bcryptPass(password);
      const createUser = await User.create({
        username,
        email,
        password: hasPassword,
        role,
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
      if (findUser) {
        const passwordHash = findUser.password;
        const chekPassword = comparePass(password, passwordHash);
        if (chekPassword) {
          const token = generateToken({
            id: findUser.id,
            username: findUser.username,
          });
          res.status(200).json({
            access_token: token,
          });
        } else throw { name: "user not found" };
      } else throw { name: "user not found" };
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
