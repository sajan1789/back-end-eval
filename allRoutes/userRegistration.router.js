const express=require("express")
const usersRouter=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UseregistrationModel}=require("../Model/usersData.Model")
usersRouter.post("/signup",async (req,res)=>{
    const {name,email,password,age,gender,city}=req.body
     const user=await UseregistrationModel.find({email})
     if(user.length>0){
        res.status(200).send("You are already registers with us,Please Login")
     }
     else{
        try{
            bcrypt.hash(password,5,async(err,hash)=>{
            const new_user=new UseregistrationModel({name,email,password:hash,gender,age,city})
            await new_user.save()
            res.send('SignUp SuccessFully.');
            })
        }catch(err){
                res.status(400).send(err)
        }
     }
})
usersRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body
       
      try{
        const user=await UseregistrationModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
             if(result){
                res.send({"msg":"Login SuccessFull","token":jwt.sign({"userId":user[0]._id},"masai")})
             }
             else{
                res.send("Wrong Password")
             }
            })
        }
        else{
            res.send("First Signup")
        }

      }catch(err){
        res.send(err)
      }
 })
 
module.exports={usersRouter}