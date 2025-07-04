const express = require('express')
const router = express.Router();
const cors=require("cors")
const mongodb=require("mongoose")
const { savednotes } =require("../model/schema");
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
module.exports=router