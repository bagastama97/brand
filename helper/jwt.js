const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "secrete key kosong");
};

module.exports = verifyToken;
