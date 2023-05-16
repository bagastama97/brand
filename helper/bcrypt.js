function bcryptPass(data) {
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
}
function comparePass(user, db) {
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.compareSync(user, db);
}
module.exports = { bcryptPass, comparePass };
