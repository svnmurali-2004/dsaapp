//@desc verify user
//@route post /api/users/verify
//@access private
const user = require("../models/userSchema");
const questions=require("../models/questionsSchema")
const contactus=require("../models/contactusSchema")
const asyncHandler=require("express-async-handler")
const contactusMailTemplate=require("../mailtemplates/contactusMailTemplate")
const sendMail=require("../middleware/mailSender1")
const verify=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        console.log(data)
        res.status(200).send({ok:true,msg:"verified"})
    }catch(err){
        next(err)
    }
})

//@desc marks as solved user
//@route post /api/users/markassolved
//@access private
const markassolved=asyncHandler(async(req,res,next)=>{
    try{
        const {questionid}=req.body;
        const {email}=req.userdata;
        console.log(email)
        const user1=await user.findOne({email});
        if(!user){
            next(err);
        }else{
            if(user1.solved.includes(questionid)){
            user1.solved.push(questionid);
            user1.save();
            res.status(200).send({ok:true,msg:"question status updated as solved"})
            }else{
                res.status(200).send({ok:false,msg:"question already solved"})
            }
        }


    }catch(err){
        console.log(err)
        next(err)
    }
})

//@desc mark as unsolved user
//@route post /api/users/markasunsolved
//@access private

const markasunsolved=asyncHandler(async(req,res,next)=>{
    try{
        const {questionid}=req.body;
        const {email}=req.userdata;
        const user1=await user.findOne({email})
        if(!user){
            res.status(401)
            next(new Error("authentication error"))
        }else{
            user1.solved.pull(questionid);
            user1.save()
            res.status(200).send({ok:true,msg:"question status updated as unsolved"})
            }
        
    }catch(err){
        next(err)
    }
});



//@desc get leaderboard
//@route post /api/actions/leaderboard
//@access private
const leaderboard=asyncHandler(async(req,res,next)=>{
    try{
        const users=await user.find().sort({"solved.length":-1});
        res.status(200).send({ok:true,users})
    }catch(err){
        next(err)
    }
})

//@desc get profile
//@route post /api/actions/profile
//@access private
const profile=asyncHandler(async(req,res,next)=>{
    try{
        const {email}=req.userdata;
        const user1=await user.findOne({email}).select({password:0});
        res.status(200).send({ok:true,userdata:user1})
    }catch(err){
        next(err)
    }
})

//@desc get questions
//@route post /api/actions/getsections
//@access private

const getsections=asyncHandler(async(req,res,next)=>{
    try{
        const userdata=req.userdata;
        const user1=await user.findOne({email:userdata.email})
        const result=await questions.aggregate([{
            $group:{
                _id:"$section",
                questions:{$push:"$$ROOT"},
                totalQuestions:{$sum:1},
                questionsSolved:{$sum:{$cond:[{$in:["$_id",user1.solved]},1,0]}}
            }
        }])
        
        const solved=user1.solved;
        res.status(200).send({ok:true,questionsset:result})
    }catch(err){
        next(err)
    }
})

//@desc get questions by section
//@route /api/actions/section/:section
//@access private
const getquestions=asyncHandler(async(req,res,next)=>{
    try{
        const {section}=req.params
        const userdata=req.userdata;
        const userdata1=await user.findOne({email:userdata.email})

        const questions1=await questions.aggregate(
            [
                {$match:{section:section}},
                {$set:{solved:{$cond:[{$in:["$_id",userdata1.solved]},true,false]}}},
                {$group:{
                    _id:section,
                    questions:{$push:"$$ROOT"},
                    totalQuestions:{$sum:1},
                }}
            ]
        )

        res.status(200).send({ok:true,questionsset:questions1[0]})

    }catch(err){
        next(err)
    }
})

//@desc contact us
//@route /api/actions/contactus
//@access public
const contactusfunction=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const contactform=new contactus(data);
        const respo=await contactform.save()
        if(respo){
            sendMail({from:process.env.mail,to:data.email,name:data.name,subject:"contact form received",text:"acknowledgement of contact form",html:contactusMailTemplate(respo)})
            res.status(200).send({ok:true,msg:"contact form submitted"})}
            else{
                res.status(400).send({ok:false,msg:"contact form not submitted"})
            }

    }catch(err){
        next(err)
    }
})
module.exports={verify,markassolved,markasunsolved,leaderboard,profile,getquestions,getsections,contactusfunction}

