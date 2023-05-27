const Authentication = require("../middleware/authentication");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.get("/", Authentication, Controller.findAllHistory);
module.exports = router;
