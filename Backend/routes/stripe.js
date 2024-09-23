const express = require("express");
const paymentRouter = express.Router();
const {handlePayment} = require("../controllers/stripe");

paymentRouter.route("/payment").post(handlePayment);

module.exports = paymentRouter;