const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/", Controller.login);
module.exports = router;
