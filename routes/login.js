const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/", Controller.login);
router.post("/google", Controller.loginGoogle);
module.exports = router;
