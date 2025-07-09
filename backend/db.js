import dotenv from 'dotenv';
dotenv.config();
import mongodb from"mongoose"
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
export default {
   connectdb,
}