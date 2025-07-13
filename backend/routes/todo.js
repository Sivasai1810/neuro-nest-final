import express from 'express';
const router = express.Router();
import cors from 'cors';
import mongodb from 'mongoose';
import models from '../model/schema.js';
const { todo } = models; 
router.use(express.json());
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

router.post('/', async(req,res)=>{
 const { userId ,tasks}=req.body;

const exist=await todo.findOne({ userId: new mongodb.Types.ObjectId(userId)  })
try{
if(exist){
    exist.content.push(tasks);
    exist.save();
    res.json({message:"notes saved sucessfully"});
    }   
else{
    const newtask=new todo({
        userId:new mongodb.Types.ObjectId(userId),
        content:[tasks]
    })
    newtask.save();
}}catch(error){
    console.log("internal server error",error);
}
    
})
router.get('/get',async(req,res)=>{
    try{
const userId=req.query.userId;
const existing=await todo.findOne({ userId: new mongodb.Types.ObjectId(userId) })
if(existing){
    const getext=existing.content;
    res.json({
        usertext:getext
    })
}}catch(error){
    console.log(error);
}
})

router.post('/delete',async(req,res)=>{
    const { index , userId}=req.body;
    parseFloat(index);
    const exist=await todo.findOne({userId:new mongodb.Types.ObjectId(userId)})
    if(!exist){
        return(
        res.json({
            message:"unable to delete"
        })
    )
    }
       if(index>=0&&index<exist.content.length){
        exist.content.splice(index, 1);
        await exist.save();
        res.json({
            message:"deleted sucessfully",
            content:exist.content
        })
       }
       else{
res.json({
    message:"bhai out of control"
})
       }
    

})

export default router
