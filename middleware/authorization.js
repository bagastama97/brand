const { Product, User, Category } = require("../models/");
const Authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: req.additionalData.userId },
    });
    if (!user || user.role != "admin") throw { name: "Forbidden" };
    const product = await Product.findByPk(id);
    if (!product) throw { name: "NotFound" };
    if (product.authorId != user.id) throw { name: "not yours" };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = Authorization;
