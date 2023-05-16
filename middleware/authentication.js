const verifyToken = require("../helper/jwt");
function Authentication(req, res) {
  const token = req.headers;
  const verify = verifyToken(token);
  console.log(verify);
}
module.exports = Authentication;
