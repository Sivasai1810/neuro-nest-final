import express from 'express'
import mongoose from 'mongoose'
import AWS from 'aws-sdk';
import dotenv from 'dotenv'
const router=express.Router();
import model from '../model/schema.js'
const { folderurl } =model
router.use(express.json())
dotenv.config();
const s3=new AWS.S3({
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION,
    signatureVersion: 'v4'
})
router.get('/', async(req,res)=>{
    console.log("ok ok");
const {userId,index} =req.query;
const exist=await folderurl.findOne({userId: new mongoose.Types.ObjectId(userId)})
try{
if(!exist){
    res.json({
        message:"userid does not exist"
    })
}
const fileurl=exist.url[index];

const s3key = decodeURIComponent(new URL(fileurl).pathname.slice(1));

const params={
    Bucket:process.env.AWS_S3_BUCKET,
    Key:s3key,
     Expires: 60

}

const signedUrl = await s3.getSignedUrlPromise("getObject", params);
res.json({ url: signedUrl });
}catch(error){
    // res.json({
    //     message:"internal server error"
        
    // })
    console.log("error",error);
}

})

export default router