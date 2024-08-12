const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");
const transactionRoute = require("./transaction.route");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/accounts", accountRoute);
router.use("/transactions", transactionRoute);

module.exports = router