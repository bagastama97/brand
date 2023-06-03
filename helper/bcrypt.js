const bcrypt = require("bcrypt");
const saltRounds = 10;

function bcryptPass(passwordInput) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(passwordInput, salt);
}
function comparePass(passwordInput, passwordDb) {
  return bcrypt.compareSync(passwordInput, passwordDb);
}
module.exports = { bcryptPass, comparePass };
