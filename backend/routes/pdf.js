import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import dotenv from 'dotenv';
import model from '../model/schema.js'
import  mongodb  from "mongoose";
import { url } from "inspector";
const { folderurl }=model;
dotenv.config();
const router=express.Router();
router.use(express.json());
const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
})
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/', upload.array("myfiles"), async (req, res) => {
  try {

    const userId = req.body.userId;
    let uploadedUrls=[];
    for (const file of req.files) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `uploads/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

 const result = await s3.upload(params).promise();
uploadedUrls.push(result.Location);
    }
  
    const exist = await folderurl.findOne({ userId: new mongodb.Types.ObjectId(userId) });
    if (exist) {
      exist.url.push(...uploadedUrls);
      await exist.save();
    } else {
      const newurl = new folderurl({
        userId: userId,
        url:uploadedUrls, 
      });
      await newurl.save();
    }
    res.json({ message: "Files uploaded successfully", files: uploadedUrls,status:true });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error", status:false });
  }
});


export default router;