const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
const { verifyToken, generateToken } = require("../helper/jwt");
class Controller {
  static async findAllProducts(req, res) {
    try {
      const find = await Product.findAll();
      res.status(200).json({
        statusCode: 200,
        message: find,
      });
    } catch (err) {
      if (err) {
        res.status(500).json({
          statusCode: 500,
          message: "gagal",
          error: err,
        });
      }
    }
  }
  static async createProducts(req, res) {
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
      console.log(find);
      res.status(201).json({
        statusCode: 201,
        message: req.body,
      });
    } catch (err) {
      if (err.name == "SequelizeValidationError") {
        const message = err.errors.map((el) => el.message);
        res.status(400).json({
          statusCode: 400,
          message: message,
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: "server error",
        });
      }
    }
  }
  static async findOneProducts(req, res) {
    const { id } = req.params;
    try {
      const find = await Product.findByPk(id);
      if (find) {
        res.status(200).json({
          statusCode: 200,
          message: find,
        });
      }
      //else throw { name: "Not Found" };
    } catch (err) {
      if (err) {
        res.status(404).json({
          statusCode: 404,
          message: "Not Found",
        });
      }
    }
  }
  static async deleteProducts(req, res) {
    const { id } = req.params;
    try {
      const find = await Product.findAll({ where: { id: id } });
      if (find.length > 0) {
        const del = await Product.destroy({ where: { id: id } });
        res.status(200).json({
          statusCode: 200,
          message: `${find[0].name} success to delete`,
        });
      } else if (find != []) throw { name: "Not Found" };
      else throw { name: "server error" };
    } catch (err) {
      if (err.name == "Not Found") {
        res.status(404).json({
          statusCode: 404,
          message: "Not Found",
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: "gagal karena kesalahan server",
        });
      }
    }
  }
  static async findAll(req, res) {
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
      res.status(404).json({
        statusCode: 404,
        message: "gagal",
      });
    }
  }
  static async register(req, res) {
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
      res.status(400).json({
        message: "error",
      });
    }
  }
  static async login(req, res) {
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
        } else throw "err";
      } else throw "err";
    } catch (err) {
      res.status(400).json({
        message: "user not found",
      });
    }
  }
}

module.exports = Controller;
