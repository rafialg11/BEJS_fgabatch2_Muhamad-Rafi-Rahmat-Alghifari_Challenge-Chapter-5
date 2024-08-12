const router = require("express").Router();
const user = require("../../controllers/v1/user.controller");
const restrict = require("../../middlewares/restrict");

router.post("/register", user.createUser);
router.get("/getAll", restrict ,user.getAllUsers);
router.get("/getOne/:id", restrict, user.getOneUser);
router.put("/update/:id", restrict, user.updateUser);
router.delete("/delete/:id", restrict, user.deleteUser);

module.exports = router;