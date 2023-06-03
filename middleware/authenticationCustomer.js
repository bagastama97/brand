const { verifyToken, generateToken } = require("../helper/jwt");
const { Customer } = require("../models");
const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) throw { name: "Unauthenticate" };
    console.log("aman 1");
    const payload = verifyToken(access_token);
    console.log(payload);
    let customer = {};
    customer = await Customer.findOne({ where: { id: payload.id } });
    if (!customer) throw { name: "Unauthenticate" };
    console.log("aman 2");
    req.additionalData = {
      customerId: customer.id,
      customerEmail: customer.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = Authentication;
