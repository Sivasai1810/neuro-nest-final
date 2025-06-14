const express = require('express')
const router = express.Router();
const bcrypt=require("bcrypt")
const cors=require("cors")
const {user,validateinput}=require("../model/schema");
router.use(express.json())
router.use(cors())
router.post('/', async (req, res) =>{
    try{
    const {username,password,email}=req.body
    const { error }=validateinput(req.body)
    if(error){
const err=error.details[0].message
 return (
    res.json({message:err,
            success:false
    })
)
    }
    const exist= await user.findOne({ email })
    if(exist){
         return (
            res.json({message:"user already exist",
                  userId:exist._id,
                  success:false
            })
)
}

const hassedpassword=await bcrypt.hash(password,10)
const saveduser=new user({
    username:username,
    password:hassedpassword,
    email:email
})
await saveduser.save()
res.json({message:"account created sucessfully",
        userId:saveduser._id,
        success:true
})
    }
    
catch(error){
        if(error.code === 11000){
            return ( res.json({message:"username is already exist "}) )
        }
         return (res.json({message:"internal server error"}))
        // console.log("the error is",error)
    }
})
module.exports=router