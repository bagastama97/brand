const router = require("express").Router();
const Controller = require("../controllers/controller");
router.post("/", Controller.register);
module.exports = router;
