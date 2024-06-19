const welcomeMailTemplate=require("./mailtemplates/welcomeMailTemplate")

const sendmail=require("./middleware/mailSender")
const html=welcomeMailTemplate({userName:"murali"})
sendmail({to:"svnmurali1@gmail.com"},html)