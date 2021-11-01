const router = require("express").Router();
const userControllers = require("../controllers/user");

router.post("/user", userControllers.createUser);

module.exports = router;
