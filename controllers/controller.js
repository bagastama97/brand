const { History, User, Product, Category } = require("../models");
const { Op } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
const { verifyToken, generateToken } = require("../helper/jwt");
class Controller {
  static async findAllProducts(req, res, next) {
    try {
      const find = await Product.findAll({
        include: [{ model: Category }, { model: User }],
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
      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      const authorId = req.additionalData.userId;
      const status = "Active";
      const find = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imgUrl: imgUrl,
        categoryId: categoryId,
        authorId: authorId,
        status: status,
      });
      await History.create({
        title: "POST",
        description: `new product with id ${find.id} created`,
        updatedBy: find.authorId,
      });
      res.status(201).json({
        statusCode: 201,
        message: find,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name: name,
      });
      const authorId = req.additionalData.userId;
      await History.create({
        title: "POST",
        description: `new category with id ${category.id} created`,
        updatedBy: authorId,
      });
      res.status(201).json({
        statusCode: 201,
        message: category,
      });
    } catch (err) {
      next(err);
    }
  }
  static async findOneProducts(req, res, next) {
    const { id } = req.params;
    try {
      const find = await Product.findOne({
        where: { id: id },
        include: [{ model: Category }, { model: User }],
      });
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
      if (!find) throw { name: "Not Found" };
      await Product.destroy({
        where: {
          id: id,
        },
      });
      const authorId = req.additionalData.userId;
      await History.create({
        title: "DELETE",
        description: `product with id ${id} deleted`,
        updatedBy: authorId,
      });
      res.status(200).json({
        statusCode: 200,
        message: `${find[0].name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      const find = await Category.findAll({ where: { id: id } });
      if (!find) throw { name: "Not Found" };
      await Category.destroy({
        where: {
          id: id,
        },
      });
      const authorId = req.additionalData.userId;
      await History.create({
        title: "DELETE",
        description: `category with id ${id} deleted`,
        updatedBy: authorId,
      });
      res.status(200).json({
        statusCode: 200,
        message: `${find[0].name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async findAllCategory(req, res, next) {
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
      console.log(token, "ini if token manual");
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const { token_google } = req.headers;
      const { OAuth2Client } = require("google-auth-library");
      const cliendId =
        "611182462879-u7ktp5ebfh1ak5stv127g33cisjloqfu.apps.googleusercontent.com";
      const client = new OAuth2Client(cliendId);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: cliendId,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "12345",
          role: "staff",
          phoneNumber: 123,
          address: "abc",
        },
      });
      let token;
      if (user) {
        token = generateToken({
          id: user.id,
          username: user.username,
        });
        console.log(token, "ini if token google");
        res.status(200).json({
          token,
        });
      } else {
        token = generateToken({
          id: created.id,
          username: created.username,
        });
        console.log(token, "ini else token google");
        res.status(200).json({
          token,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async putProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      await Product.update(
        {
          name: name,
          description: description,
          price: price,
          stock: stock,
          imgUrl: imgUrl,
          categoryId: categoryId,
        },
        { where: { id: id } }
      );
      const authorId = req.additionalData.userId;
      await History.create({
        title: "POST",
        description: `product with id ${id} updated`,
        updatedBy: authorId,
      });
      res.status(201).json({
        statusCode: 201,
        message: `product with id ${id} updated`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async patchProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.update(
        { status: "Inactive" },
        { where: { id: id } }
      );
      const authorId = req.additionalData.userId;
      await History.create({
        title: "POST",
        description: `product status with id ${id} has been updated from Active into Inactive`,
        updatedBy: authorId,
      });
      res.status(201).json({
        statusCode: 201,
        message: `product status with id ${id} has been updated from Active into Inactive`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async findAllHistory(req, res, next) {
    try {
      const history = await History.findAll({
        order: [["id", "DESC"]],
      });
      res.status(200).json({
        statusCode: 200,
        message: history,
      });
    } catch (err) {
      next(err);
    }
  }
  // static async filterProducts(req, res, next) {
  //   try {
  //     const { productName } = req.body;
  //     console.log(productName);
  //     const find = await Product.findAll({
  //       where: {
  //         [Op.and]: [
  //           { status: "Active" },
  //           {
  //             name: { [Op.iLike]: `%${productName}%` },
  //           },
  //         ],
  //       },
  //       include: [{ model: Category }, { model: User }],
  //       order: [["id", "ASC"]],
  //     });
  //     res.status(200).json({
  //       statusCode: 200,
  //       message: find,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  // static async findAllPaginationProducts(req, res, next) {
  //   try {
  //     const { page } = req.params;
  //     const limit = 8; // buat static
  //     const offset = (page - 1) * limit; // page saat ini
  //     const count = await Product.count(); // ada berapa data yang dimiliki
  //     const totalPages = Math.ceil(count / limit); // total data : 8 akan di gunakan jadi jumlah halaman
  //     const grids = Math.ceil(count / 4); //jumlah grid
  //     const find = await Product.findAll({
  //       where: { status: "Active" },
  //       include: [{ model: Category }, { model: User }],
  //       order: [["id", "ASC"]],
  //       offset,
  //       limit,
  //     });
  //     res.status(200).json({
  //       statusCode: 200,
  //       offset: offset,
  //       countData: count,
  //       pagination: totalPages,
  //       grids: grids,
  //       message: find,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = Controller;
