import express from 'express'
import mongodb from 'mongoose'
const router=express.Router();
import  model from '../model/schema.js'
const { filelist } =model

export default router