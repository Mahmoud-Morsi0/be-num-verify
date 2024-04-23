const express = require("express");
const router = express.Router();
const phoneNumberController = require("./controllers/phoneNumberController");

router.get("/verify-number", phoneNumberController.verifyNumber);
router.get("/numbers", phoneNumberController.getAllNumbers);

module.exports = router;
