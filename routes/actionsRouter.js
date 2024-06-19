const express=require("express")
const router=express.Router();
const {verify, markassolved,markasunsolved,leaderboard,profile, getquestions,getsections,contactusfunction}=require("../controllers/actionHandler")
const authmiddleware=require("../middleware/authmiddleware")

router.post("/verify",authmiddleware,verify)
router.post("/markassolved",authmiddleware, markassolved)
router.post("/markasunsolved",authmiddleware,markasunsolved)
router.post("/leaderboard",authmiddleware,leaderboard)
router.post("/profile",authmiddleware,profile)
router.post("/getsections",authmiddleware,getsections)
router.post("/sections/:section",authmiddleware,getquestions)
router.post("/contactus",contactusfunction)
module.exports=router
