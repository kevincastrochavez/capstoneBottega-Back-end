const express = require("express");

const paymentController = require("../controllers/paymentController");
const router = express.Router();

router.route("/").get(paymentController.pay);
router.route("/create").post(paymentController.paymentCreate);

module.exports = router;
