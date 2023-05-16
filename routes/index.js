const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.get("/product", Authentication, Controller.findAllProducts);
router.post("/product", Authentication, Controller.createProducts);
router.delete(
  "/product/delete/:id",
  Authentication,
  Authorization,
  Controller.deleteProducts
);
router.get("/product/category", Authentication, Controller.findAll);
router.get("/product/:id", Authentication, Controller.findOneProducts);
module.exports = router;
