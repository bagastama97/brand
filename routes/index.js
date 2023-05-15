const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.findAllProducts);
router.get("/genres/categories/types", Controller.findAll);
// router.post("/login", Controller.login);
router.post("/", Controller.createProducts);
router.get("/:id", Controller.findOneProducts);
router.delete("/:id", Controller.deleteProducts);
module.exports = router;
