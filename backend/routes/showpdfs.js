import express from 'express'
import mongodb from 'mongoose'
const router=express.Router();
import  model from '../model/schema.js'
const { filelist } =model
router.post('/',async(req,res)=>{
    const {userId}=req.body;
    const exist=await filelist.findOne({ userId: new mongodb.Types.ObjectId(userId) })
    try{
    if(exist){
        res.json({
            message:exist.list
        })  
    }
}catch(error){
    res.json({
        message:"unable to load the files"
    })
}
})
export default router