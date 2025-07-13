import mongodb from "mongoose"
import joi from "joi"


const userschema=mongodb.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String ,required:true},
})
const user=mongodb.model("user",userschema)
const taskschemas=mongodb.Schema({
      userId:{
        type:mongodb.Schema.Types.ObjectId,
        ref:user
    },
    content :{type:[String],
          required:true,
          default:[]
    }
})
const todo=mongodb.model("todo",taskschemas);

const notesschema=mongodb.Schema({
    userId:{
        type:mongodb.Types.ObjectId,
        ref:user
    },
    notesindex:[
         {index:{type:Number},notes:{type:String}}
    ]
//     // const  notesindex=[
//     //      {index:0,notes:"arraey bhai"},
//     //       {index:1,notes:"arraey bhai from 1"}
//     // ]        
//   console.log(notesindex[0])  
  
})
const savednotes=mongodb.model("savednotes",notesschema);
const folderSchema=mongodb.Schema({
    userId:{type:mongodb.Types.ObjectId,
        ref:user
    },
    url:{type:[String],
        default:[]
    }
})
const folderurl=mongodb.model('folderurl',folderSchema);
const filename=new mongodb.Schema({
    userId:{
        type:mongodb.Types.ObjectId,
        ref:user
    },
    list:{
        type:[String],
        default:[]
    }
})
// const tempfiles=new mongodb.Schema({
//     userId:{type:mongodb.Types.ObjectId,
//         ref:user
//     }

// })
const filelist=mongodb.model("filelist",filename);
const validateinput=(data)=>{
   const Schema=joi.object({
    username:joi.string().required().label("username"),
    password:joi.string().min(3).max(10).required().label("password"),
    email:joi.string().email().required().label("email")
   })
   return Schema.validate(data,{ abortEarly: false })
}
export default{
    user,
    validateinput,
    todo,
    savednotes,
    folderurl,
    filelist
    
}