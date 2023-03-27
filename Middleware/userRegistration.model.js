const jwt=require("jsonwebtoken")
require("dotenv").config()
const authenticate=(req,res,next)=>{
     const token=req.headers.authorization;
     if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(decode){
             req.body.userId=decode.userId
             next()
            }
            else{
                res.send({"msg":"Please Login"})
            }
        })
       
       
     }
     else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={authenticate}