const { Product, User, Category } = require("../models/");
const Authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: req.additionalData.userId },
    });
    if (!user) {
      throw { name: "Forbidden" };
    }

    const product = await Product.findByPk(id);
    if (!product) {
      throw { name: "Not Found" };
    }

    if (user.role != "admin" && product.authorId != user.id) {
      throw { name: "not yours" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = Authorization;
