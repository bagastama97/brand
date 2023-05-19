const Authentication = require("../middleware/authentication");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.get("/", Authentication, Controller.findAllCategory);
router.post("/", Authentication, Controller.createCategory);
router.delete("/delete/:id", Authentication, Controller.deleteCategory);
module.exports = router;
