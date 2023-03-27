const express=require("express")
const usersRouter=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {PostModel}=require("../Model/postData.Model")
const postRouter=express.Router()
postRouter.get('/',async(req,res)=>{
  const user=req.body.userId
     try{
        const post=await PostModel.find({userId})
        res.send(post)
     }catch(err){
        res.send(err)
     }
})
postRouter.post("/add",async(req,res)=>{
     try{
        const payload=req.body
        const post=new PostModel(payload)
        await post.save()
        res.send({"msg":"New Post Added"})
     }catch(err){
      res.send(err)
     }
})
postRouter.patch("/update/:id",async(req,res)=>{
     const {id}=req.params
     const payload=req.body
     try{
        await PostModel.findByIdAndUpdate({_id:id},payload)
        res.send("Your Post has been Updated")
     }catch(err){
        res.send({"msg":err})
     }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await PostModel.findByIdAndDelete({_id:id})
        res.send("Post Deleted")
    }catch(err){
        res.send(err)
    }
})
postRouter.get("/top",async(req,res)=>{
    try{
        const top=await PostModel.find().sort({no_of_comments:-1})
          res.send(top)
    }catch(err){
        res.send(err)
    }
})


module.exports={postRouter}