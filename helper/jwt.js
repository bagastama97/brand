const jwt = require("jsonwebtoken");
const generateToken = (token) => {
  const jwtToken = jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "1d" });
  return jwtToken;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "secrete key kosong");
};

module.exports = { verifyToken, generateToken };
