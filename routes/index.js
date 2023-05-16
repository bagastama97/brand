const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/register", Controller.register);
router.get("/product", Controller.findAllProducts);
router.post("/product", Controller.createProducts);
router.delete("/product/delete/:id", Controller.deleteProducts);
router.get("/product/category", Controller.findAll);
router.get("/product/:id", Controller.findOneProducts);
module.exports = router;
