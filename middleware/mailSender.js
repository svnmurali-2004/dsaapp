const nodemailer=require("nodemailer")
const { getMaxListeners } = require("../models/userSchema")

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"codebox012@gmail.com",
        pass:"wjkk jiiy rxay fthp"
    }
})

const mailOptions = (data,html) => {
    const { to, userName, gettingStartedLink, faqLink, loginLink } = data;
    return {
        from: 'no-reply@dsaapp.com',
        to: to,
        subject: 'Welcome to DSAApp!',
        html: html,
    };
};
const sendMail=(data,html)=>{
    console.log(html)
    transporter.sendMail(mailOptions(data, html), (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

module.exports=sendMail