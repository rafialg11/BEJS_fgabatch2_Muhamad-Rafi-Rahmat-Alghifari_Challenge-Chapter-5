const router = require("express").Router();
const transaction = require("../../controllers/v1/transaction.controller");
const restrict = require("../../middlewares/restrict");

router.post("/create", restrict ,transaction.createTransaction);
router.get("/getAll", restrict, transaction.getAllTransactions);
router.get("/getOne/:id", restrict,transaction.getOneTransaction);

module.exports = router