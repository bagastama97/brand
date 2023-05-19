const { verifyToken, generateToken } = require("../helper/jwt");
const { User, Product, Category } = require("../models");
const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log("-------------", req.headers, "--------------");
    if (!access_token) throw { name: "Unauthenticate" };

    const payload = verifyToken(access_token);

    let user = {};
    user = await User.findOne({ where: { id: payload.id } });
    if (!user) throw { name: "Unauthenticate" };
    req.additionalData = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = Authentication;
