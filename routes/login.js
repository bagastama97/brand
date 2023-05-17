const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/", Controller.login);
module.exports = router;
