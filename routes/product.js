const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.get("/", Authentication, Controller.findAllProducts);
router.post("/", Authentication, Controller.createProducts);
router.delete(
  "/delete/:id",
  Authentication,
  Authorization,
  Controller.deleteProducts
);
router.get("/:id", Authentication, Controller.findOneProducts);
module.exports = router;
