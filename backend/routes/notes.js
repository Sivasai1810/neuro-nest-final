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
        const index=localStorage.getItem("notesindex")
const {userId,notes}=req.body;
const newnotes=new savednotes({
    userId:new mongodb.Types.ObjectId(userId),
    notes:notes,
    index:index

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