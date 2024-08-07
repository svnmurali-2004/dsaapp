const express=require("express")
const app=express("express")
const cors=require("cors")
const mongoose=require("mongoose")
const connectDB = require("./db")
const authmiddleware=require("./middleware/authmiddleware")
const authRouter=require("./routes/authRouter")
const actionsRouter=require("./routes/actionsRouter")
const path=require("path")
require("dotenv").config()
app.use(express.static(path.join(__dirname+"/frontend/dist")))


app.use(cors())
app.use(express.json())
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
  });
         
app.use("/api/users/",authRouter)
app.use("/api/actions/",actionsRouter)

connectDB().then(()=>{
    app.listen(5000,()=>{console.log(`server is running at port ${process.env.port}`)})
})
