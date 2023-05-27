const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.get("/", Authentication, Controller.findAllProducts);
router.post("/", Authentication, Controller.createProducts);
router.put("/:id", Authentication, Authorization, Controller.putProduct);
router.patch("/:id", Authentication, Authorization, Controller.patchProduct);
router.delete(
  "/delete/:id",
  Authentication,
  Authorization,
  Controller.deleteProducts
);
router.get("/:id", Authentication, Controller.findOneProducts);
module.exports = router;
