require('dotenv').config()
const mongodb=require("mongoose")
const connectdb= async ()=>{
   try{
     await mongodb.connect(process.env.MONGODB_URL
     )
    console.log("mongodb connected sucessfully")
   }
   catch(error){
    console.log("unable to connect the database",error)
   }
}
module.exports={
   connectdb,
}