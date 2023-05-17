const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const routerLogin = require("./login");
const routerRegister = require("./register");
const routerProduct = require("./product");
const Controller = require("../controllers/controller");

router.use("/login", routerLogin);
router.use("/register", routerRegister);
router.use("/product", routerProduct);
module.exports = router;
