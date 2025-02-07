const express= require("express")
const app=express();
app.use(express.json());
const userRouter=require("./Router/userRouter")
const adminRouter=require("./Router/adminRouter")


app.use("/Auth", userRouter)
app.use("/Products",adminRouter)


module.exports=app;