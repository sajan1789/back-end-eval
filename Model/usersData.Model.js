
const mongoose=require("mongoose")
const userRegistration=mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married:Boolean
},{versionKey:false})

const UseregistrationModel=mongoose.model("user",userRegistration)
module.exports={UseregistrationModel}