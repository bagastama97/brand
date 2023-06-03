const {
  History,
  User,
  Product,
  Category,
  Wishlist,
  Customer,
} = require("../models");
const { Op } = require("sequelize");
const { bcryptPass, comparePass } = require("../helper/bcrypt");
const { verifyToken, generateToken } = require("../helper/jwt");
class ControllerCustomer {
  static async register(req, res, next) {
    try {
      console.log("masuk");
      const { email, password } = req.body;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw { name: "validationError" };
      }
      if (email === "" || password === "") {
        throw { name: "validationError" };
      }
      if (email === undefined || password === undefined) {
        throw { name: "validationError" };
      }
      const hashPassword = bcryptPass(password);
      const createUser = await Customer.create({
        email,
        password: hashPassword,
        role: "customer",
      });
      if (createUser) {
        res.status(201).json({
          id: createUser.id,
          password: createUser.password,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await Customer.findOne({ where: { email } });
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
        email: findUser.email,
      });
      console.log(token, "ini if token manual");
      res.status(200).json({
        access_token: token,
      });
      next();
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
          role: "customer",
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
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async findAllProducts(req, res, next) {
    try {
      /////////pagination
      let { page } = req.params;
      if (!page) {
        page = 1;
      }
      console.log("cek disiniiiiiii", req.params);
      let { productName } = req.body;
      if (!productName) {
        productName = "";
      }
      let offset = (page - 1) * 8;
      // const limit = 8; // buat static
      // const offset = (page - 1) * limit; // page saat ini
      // const count = await Product.count(); // ada berapa data yang dimiliki
      // const totalPages = Math.ceil(count / limit); // total data : 8 akan di gunakan jadi jumlah halaman
      // const grids = Math.ceil(count / 4); //jumlah grid
      ////filter
      console.log(productName);
      const find = await Product.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: { [Op.iLike]: `%${productName}%` },
            },
          ],
        },
        offset: offset,
        limit: 8,
        include: [{ model: Category }, { model: User }],
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        countData: find.count,
        data: find.rows,
      });
      next();
    } catch (err) {
      next(err);
    }
  }
  static async wishlist(req, res, next) {
    try {
      const userId = req.additionalData.customerId;
      const Wish = await Wishlist.findAll({
        include: Product,
        where: {
          CustomerId: userId,
        },
      });
      res.status(200).json({
        data: Wish,
      });
      next();
    } catch (err) {
      next(err);
    }
  }
  static async addWishlist(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.additionalData.customerId;
      console.log(id, userId, "cek disini");
      const cekWish = await Wishlist.findOne({
        where: {
          [Op.and]: [{ ProductId: id }, { CustomerId: userId }],
        },
      });
      if (cekWish) {
        throw { name: "already in wish" };
      }
      const addWish = await Wishlist.create({
        ProductId: id,
        CustomerId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({
        data: addWish,
      });
      next();
    } catch (err) {
      console.log(err.name);
      next(err);
    }
  }
  static async viewProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id: id } });
      console.log(product);
      if (!product) {
        throw { name: "Not Found" };
      }
      res.status(200).json({
        data: product,
      });
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerCustomer;
