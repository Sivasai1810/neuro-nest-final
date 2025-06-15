const express = require('express')
const router = express.Router()
const bcrypt=require("bcrypt")
const joi=require("joi")
const jwt=require("jsonwebtoken")
const verifyToken=require('../middlewares/verify')
const cookiepraser=require("cookie-parser")
const {user}=require("../model/schema")
const cors=require('cors')
router.use(express.json())
// connectdb()
router.use(cookiepraser())
router.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // or whatever your frontend origin is
  credentials: true,
};
router.use(cors(corsOptions));
const jwt_secret=process.env.JWT_PASSWORD
router.post('/', async (req, res)=>{
    try{
const {username,password}=req.body
const { error }=newinputs(req.body)
if(error){
    return(
   
       res.json({message:error.message,
                  success:false
        })
    
)}
const exist=await user.findOne({ username })
if(!exist){
    return(
        res.json({message:"user doesnot exist",
                  success:false
        })
    )
}
const verifypassword=await bcrypt.compare(password,exist.password)
if(!verifypassword){
    return (
        res.json({message:"password is invalid",
                 success:false
        })
    )
}
const playload=({username:username})
const accessToken= jwt.sign(playload,jwt_secret,{
    expiresIn:"15m"
})
const refreshToken= jwt.sign(playload,jwt_secret,{
    expiresIn:"7d"
})
res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:false,
    sameSite:"Lax",
    maxAge:30*60*1000
})
res.cookie("refreshToken",refreshToken,{
 httpOnly:true,
    secure:false,
    sameSite:"Lax",
    maxAge:30*60*1000
})

res.json({message:"loggend sucessfully bro",
    //    userId:exist._id ,
    success:true  })}
catch(error){
    res.json({message:"internal server error" ,error})
}
})


const newinputs=(data)=>{
    const Schema=joi.object({
        username:joi.string().required().label("username"),
        password:joi.string().min(3).max(10).required().label("password"),
    })
     return Schema.validate(data,{ abortEarly: false })

}
module.exports=router


