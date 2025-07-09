import express from 'express';
const router = express.Router();
import cors from 'cors';
import mongodb from 'mongoose';
import models from '../model/schema.js';
const { savednotes } = models;
router.use(express.json())
router.use(cors())
router.post('/',async (req,res)=>{
    try{
const {userId,notes}=req.body;
// const exist=await savednotes.findOne({userId:new mongodb.Types.ObjectId(userId)})
// if(exist){
//     res.json({
//         message:exist.notes,
//         success:true
//     })
// }
const newnotes=new savednotes({
    userId:new mongodb.Types.ObjectId(userId),
    notes:notes

})
res.json({
        message:"notes saved sucessfully",
        success:false
    })

await newnotes.save();
}
catch(error){
    console.log(error)

}

})
export default router;