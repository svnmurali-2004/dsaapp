const express=require("express")
const router=express.Router()
const authmiddleware=require("../middlewares/authmiddleware")
const {login,signup}=require("../controllers/authController")
router.post("/api/login",login)
router.post("/api/signup",signup);
module.exports=router