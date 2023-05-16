const jwt = require("jsonwebtoken");
const generateToken = (token) => {
  return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "secrete key kosong");
};

module.exports = { verifyToken, generateToken };
