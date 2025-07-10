import express from 'express'
const router=express.Router();
import mongodb from  'mongoose';
import  model from '../model/schema.js'
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
