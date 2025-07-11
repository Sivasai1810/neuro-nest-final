import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/verify.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import models from '../model/schema.js';
const { user, validateinput } = models;
router.use(express.json())
// connectdb()
router.use(cookieParser())
router.use(cors());
const corsOptions = {
  origin: 'https://neuro-nest-2.onrender.com', 
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
     userId:exist._id ,
    success:true,
username:exist.username  })}
catch(error){
    res.json({message:"internal server error" ,error})
}
})
console.log()


const newinputs=(data)=>{
    const Schema=joi.object({
        username:joi.string().required().label("username"),
        password:joi.string().min(3).max(10).required().label("password"),
    })
     return Schema.validate(data,{ abortEarly: false })

}
export  default router


