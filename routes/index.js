const router = require("express").Router();
const routerLogin = require("./login");
const routerRegister = require("./register");
const routerProduct = require("./product");
const routerCategory = require("./category");
const routerHistory = require("./history");

router.use("/login", routerLogin);
router.use("/register", routerRegister);
router.use("/product", routerProduct);
router.use("/category", routerCategory);
router.use("/history", routerHistory);
module.exports = router;
