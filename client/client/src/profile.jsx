import React, { useState } from 'react'
import { useNavigate }from 'react-router-dom'
import Stop from './stopwatch'
import Todo from './todo'
import Botimage from './assets/bot.png'
import ChatBot from './chatbot'

const profile =()=> {
  const navigation=useNavigate();
  const[files,setFiles]=useState([])
   const [message5,setMessage5]=useState('')   
//    try{
//    useEffect(()=>{   
//     const fetch=async()=>{
// const res= await axios.get("http://localhost:2023/api/dashboard",{
//     withCredentials:true
   
// })
// setMessage5(res.data.user) 
// }
// fetch()
//  },[])
//    }catch(error){
//     console.log("arey babu",error)
//    }

  const handleput=(e)=>{
console.log(e.target.files)
const newfiles=Array.from(e.target.files)
 console.log(newfiles[0].name)
 setFiles((files)=>[...files,...newfiles])
}


// const formdata=new FormData()
//     files.forEach((file)=>{
// formdata.append("myfiles",file)
//     })
// for (let pair of formdata.entries()){
//   console.log(pair[0],pair[1])
// }



//    const handlepush=async(e)=>{
// e.preventDefault()
// const formdata=new FormData()
//     files.forEach((file)=>{
// formdata.append("myfiles",file)
//     })
//     try{
//       const res=await axios.post('',formdata,{
//         headers:{
//           "Content-Type":"multipart/form-data"
//         }
//       })
//       console.log(res.data.message)
//       alert("uploaded sucessfully")
//     }catch(error){
//       console.log("error",error)
//     }
//    }

  return (
    
    <div >
      <p>WELCOME</p>
      <p>{message5}</p>
      <input type='file' 
       webkitdirectory='true'
       multiple
       onChange={handleput}
      />
   <select>
   {files.map((filename,index)=>(
    <option key={index}>{filename.name}</option>
   ))}
   </select>
     <button type='submit'>upload file</button>
     <div className='rightbar'>
         <div className='stopwatch'>
       <Stop />
    </div>   
    </div>
       <div className='todo'>
 <Todo />
    </div>
<div className='bot'>
<img className='botimage' src={Botimage} alt="botimage"  onClick={()=>navigation('/chatbot')}/>
</div>
</div>


       

  )
}

export default profile
