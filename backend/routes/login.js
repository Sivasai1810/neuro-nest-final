// const express = require('express')
// const router = express.Router()
// const bcrypt=require("bcrypt")
// const joi=require("joi")
// const jwt=require("jsonwebtoken")
// const verifyToken=require('../middlewares/verify')
// const cookiepraser=require("cookie-parser")
// const {user}=require("../model/schema")
// const cors=require('cors')
// router.use(express.json())
// // connectdb()
// router.use(cookiepraser())
// router.use(cors())
// const jwt_secret=process.env.JWT_PASSWORD
// router.post('/', async (req, res)=>{
//     try{
// const {username,password}=req.body
// const { error }=newinputs(req.body)
// if(error){
//     return(
   
//        res.json({message:err.message,
//                   success:false
//         })
    
// )}
// const exist=await user.findOne({ username })
// if(!exist){
//     return(
//         res.json({message:"user doesnot exist",
//                   success:false
//         })
//     )
// }
// const verifypassword=await bcrypt.compare(password,exist.password)
// if(!verifypassword){
//     return (
//         res.json({message:"password is invalid",
//                  success:false
//         })
//     )
// }
// const playload=({username:username})
// const accessToken= jwt.sign(playload,jwt_secret,{
//     expiresIn:"15m"
// })
// const refreshToken= jwt.sign(playload,jwt_secret,{
//     expiresIn:"7d"
// })
// res.cookie("accessToken",accessToken,{
//     httpOnly:true,
//     secure:false,
//     sameSite:"Lax",
//     maxAge:30*60*1000
// })
// res.cookie("refreshToken",refreshToken,{
//  httpOnly:true,
//     secure:false,
//     sameSite:"Lax",
//     maxAge:30*60*1000
// })
//   console.log("BODY", req.body); // ⬅️ Add this
//   console.log("COOKIES", req.cookies);
// res.json({message:"loggend sucessfully bro",
//     //    userId:exist._id ,
//     success:true  })}
// catch(error){
//     res.json({message:"internal server error" ,error})
// }
// })

// router.get("/profile", verifyToken, (req, res) => {
//   res.json({ message: "Profile loaded", user: req.username });
// });
// const newinputs=(data)=>{
//     const Schema=joi.object({
//         username:joi.string().required().label("username"),
//         password:joi.string().min(3).max(8).required().label("password"),
//     })
//      return Schema.validate(data,{ abortEarly: false })

// }
// module.exports=router


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify');
const cookieParser = require('cookie-parser');
const { user } = require("../model/schema");
const cors = require('cors');

router.use(express.json());
router.use(cookieParser());
router.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // or whatever your frontend origin is
  credentials: true,
};
router.use(cors(corsOptions));


const jwt_secret = process.env.JWT_PASSWORD;
const validateInput = (data) => {
  const schema = joi.object({
    username: joi.string().required().label("Username"),
    password: joi.string().min(3).max(8).required().label("Password"),
  });
  return schema.validate(data, { abortEarly: false });
};


router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = validateInput(req.body);

    if (error) {
      const messages = error.details.map(err => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    const exist = await user.findOne({ username });
    if (!exist) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, exist.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const payload = { username };
    const accessToken = jwt.sign(payload, jwt_secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // Set true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("BODY:", req.body);
    console.log("COOKIES:", req.cookies);

    res.json({
      success: true,
      message: "Logged in successfully",
      userId: exist._id
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
});


router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile loaded",
    user: req.username
  });
});

module.exports = router;

