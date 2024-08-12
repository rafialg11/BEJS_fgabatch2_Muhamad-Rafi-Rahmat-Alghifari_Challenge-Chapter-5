const router = require("express").Router();
const transaction = require("../../controllers/v1/transaction.controller");

router.post("/create", transaction.createTransaction);
router.get("/getAll", transaction.getAllTransactions);
router.get("/getOne/:id", transaction.getOneTransaction);

module.exports = router