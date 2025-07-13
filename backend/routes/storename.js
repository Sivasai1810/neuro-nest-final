import express from 'express'
const router=express.Router();
import mongodb from  'mongoose';
import  model from '../model/schema.js'
import cors from 'cors';
const allowedOrigins = [
  "https://neuro-nest-final-1.onrender.com",
  'http://localhost:5173'
];

router.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
const { filelist } =model
router.post('/',async(req,res)=>{
const {userId,name}=req.body;
const exist=await filelist.findOne({ userId: new mongodb.Types.ObjectId(userId) })
try{
if(exist){
    exist.list.push(name);
     await exist.save();
}
 const newtask=new filelist({
        userId:new mongodb.Types.ObjectId(userId),
        list:name
    })
    newtask.save();

}catch(error){
    res.json({
        message:"internal server error"
    })
}


})
export default router;
