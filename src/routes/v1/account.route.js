const router = require("express").Router();
const account = require("../../controllers/v1/account.controller");
const restrict = require("../../middlewares/restrict");

router.post("/create", restrict, account.createAccount);
router.get("/getAll", restrict, account.getAllAccounts);
router.get("/getOne/:id", restrict, account.getOneAccount);
router.patch("/changePin/:id", restrict, account.changePin);
router.delete("/delete/:id", restrict, account.deleteAccount);

module.exports = router;