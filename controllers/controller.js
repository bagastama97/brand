const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");
class Controller {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const find = await User.findAll({
        where: { [Op.and]: [{ email: email }, { password: password }] },
      });
      if (find.length > 0) {
        res.status(200).json({
          access_token: find[0].role,
          request_body: { email: find[0].email, password: find[0].password },
          response: {
            id: find[0].id,
            email: find[0].email,
          },
        });
      } else throw { name: "Not Found" };
    } catch (err) {
      if (err) {
        res.status(500).json({
          statusCode: 500,
          message: "gagal",
        });
      }
    }
  }
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
          message: err,
        });
      }
    }
  }
  static async findOneProducts(req, res) {
    const { id } = req.params;
    try {
      const find = await Product.findAll({ where: { id: id } });
      if (find.length > 0) {
        res.status(200).json({
          statusCode: 200,
          message: find,
        });
      } else throw { name: "Not Found" };
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
      } else throw { name: "Not Found" };
    } catch (err) {
      if ((err.name = "Not Found")) {
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
}

module.exports = Controller;
