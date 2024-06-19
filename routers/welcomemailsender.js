const express = require('express');
const router = express.Router();

const nodemailer=require("nodemailer");

const mailer=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"codebox012@gmail.com",
        pass:"syzb lzbz frun dhri"
    }
})
const mailoptions=(data)=>{
    return {
        from:"codebox012@gmail.com",
        to:data.email,
        subject:data.subject,
        text:data.text,
        html:data.html
    }
  
}
mailer.sendMail(mailoptions(),(err,info)=>{
    if (err){
        console.log(err)
    }else{
        console.log(info.messageId)
    }
})

const welcomemailsender = (data)=>{
    mailer.sendMail(mailoptions(data),(err,info)=>{
        if (err){
            console.log(err)
        }else{
            console.log(info.messageId)
        }
    })
}

module.exports = welcomemailsender;