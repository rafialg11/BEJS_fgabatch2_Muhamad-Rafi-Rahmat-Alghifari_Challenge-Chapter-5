const router = require("express").Router();
const user = require("../../controllers/v1/user.controller");
const restrict = require("../../middlewares/restrict");

router.post("/register", user.createUser);
router.get("/getAll", restrict ,user.getAllUsers);

module.exports = router;