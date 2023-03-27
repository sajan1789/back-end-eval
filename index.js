const express=require("express");
const {connection}=require("./db")
const app=express()
const {authenticate}=require("./Middleware/userRegistration.model")
require('dotenv').config()
const {postRouter}=require("./allRoutes/postRouter")
const {usersRouter}=require("./allRoutes/userRegistration.router")
app.use(express.json())
app.use("/users",usersRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
     try{
       await connection
       console.log("connection success")
     }
     catch(err){
      console.log(err)
     }
     console.log(`server is running on ${process.env.port}`)
})
