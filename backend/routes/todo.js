const express=require('express')
const router=express.Router();
const cors=require('cors');
const  mongodb=require('mongoose');
const { todo }=require('../model/schema');
router.use(express.json());
router.use(cors());

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



module.exports=router;
