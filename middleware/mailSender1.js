const nodemailer=require("nodemailer")


const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"codebox012@gmail.com",
        pass:"wjkk jiiy rxay fthp"
    }
})

const mailOptions=(data)=>{return {
    from:data.from,
    to:data.to,
    subject:data.subject,
    text:data.text,
    html:data.html
}}

const sendMail=async(data)=>{
    try{
        const info=await transport.sendMail(mailOptions(data))
        if (info){
            console.log(info)
            return true
        }else{
            console.log("error")
            return false
        }
        
    }catch(err){
        console.log(err)
        return false
    }
}

module.exports=sendMail