const Authentication = require("../middleware/authenticationCustomer");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();
const ControllerCustomer = require("../controllers/customer");

router.post("/login", ControllerCustomer.login);
router.post("/register", ControllerCustomer.register);
router.post("/google", ControllerCustomer.loginGoogle);
router.post("/home/:page", ControllerCustomer.findAllProducts);
router.get("/view/:id", Authentication, ControllerCustomer.viewProduct);
router.get("/wishlist", Authentication, ControllerCustomer.wishlist);
router.get("/addWishlist/:id", Authentication, ControllerCustomer.addWishlist);
module.exports = router;
