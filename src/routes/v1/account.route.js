const router = require("express").Router();
const account = require("../../controllers/v1/account.controller");
const restrict = require("../../middlewares/restrict");

router.post("/create", restrict, account.createAccount);
router.get("/getAll", account.getAllAccounts);
router.get("/getOne/:id", account.getOneAccount);
router.patch("/changePin/:id", account.changePin);
router.delete("/delete/:id", account.deleteAccount);

module.exports = router;