import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import models from '../model/schema.js';
const { user, validateinput } = models;
const router = express.Router();
router.use(express.json())
router.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

router.post('/', async (req, res) =>{
    console.log("ayya ami ayyidhi ayya")
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
export default router;