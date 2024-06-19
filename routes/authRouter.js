const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {login,signup,googleauth,getotp,otpverify}=require("../controllers/authController")

router.post("/login",login)
router.post("/signup",signup)
router.post("/googleauth",googleauth)
router.post("/getotp",getotp)
router.post("/otpverify",otpverify)
module.exports = router;