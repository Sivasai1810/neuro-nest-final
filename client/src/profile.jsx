import React, { useEffect, useRef, useState } from 'react'
import { useNavigate }from 'react-router-dom'
import Stop from './stopwatch'
import Botimage from './assets/bot.png'
import axios from 'axios'
import path from 'path'

const profile =()=> {
  const userId=localStorage.getItem("userId");
  const[files,setFiles]=useState([])
 const [selectedfiletype,setFiletype]=useState("");
 const [selectedfileurl,setFileurl]=useState("");
  useEffect(()=>{
const getlist=async()=>{
  const res= await axios.post("http://localhost:2022/alignpdf",{
    userId:userId
  })
 let listoffiles=res.data.message;
   setFiles(()=>[...listoffiles])
}


  getlist();
},[])
  const navigation=useNavigate();
  
 const fileInputRef=useRef(null);
 const [listfiles,setListfiles]=useState([]);
   const [message5,setMessage5]=useState('')
  const handleput=async(e)=>{
const newfiles=Array.from(e.target.files)
 setFiles((files)=>[...files,...newfiles])
  const filenames = newfiles.map((file) => file.name);
    setListfiles((prev) => [...prev, ...filenames]);
 if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
   
}

const uploadname=async(e)=>{
  e.preventDefault();
if (files.length === 0) {
      alert("Please select files first.");
      return;
    }
  try{
 const callingRes= await axios.post("http://localhost:2022/callingfiles",{
  userId:userId,
  name:listfiles
  
})
}catch(error){
  console.log(error);
}}
const awscall=async(e)=>{
   e.preventDefault();
  try{
const formdata=new FormData()
    files.forEach((file)=>{
formdata.append("myfiles",file)
    })
  formdata.append("userId",userId);
    const res=await axios.post('http://localhost:2022/pdf',formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      console.log("upload response:", res.data);
      alert("uploaded sucessfully")
    
      setListfiles([]);
      setMessage5("Upload completed!");
    }catch(error){
      console.log("error",error)
    }
}
const handlepush=async(e)=>{
await uploadname(e);
await awscall(e);
   }
const handleshow = async(index) => {
  try{
  const response=await axios.get(`http://localhost:2022/get-signed-url?index=${index}&&userId=${userId}`)
  const url=response.data.url;
console.log(url)
 const newwindow= window.open('',"_self");
 const pathname=new URL(url).pathname;
 const filename=pathname.split(" ").pop().toLowerCase();
  setFiletype(filename);
  setFileurl(url);
  }catch(error){
    console.log("error",error);
     alert("Unable to load file.");
  }
};
     
  return (
    
    <div >
      <div className='filesystem'> 
      <p className='heading1'>WELCOME</p>
      <p>{message5}</p>
      <input type='file' 
      className='file'
       webkitdirectory='true'
       multiple
       onChange={handleput}
        ref={fileInputRef}
      /><br/>
 <button onClick={handlepush}>upload</button>
     </div>
     <div className='rightbar'>
         <div className='stopwatch'>
       <Stop />
           <button className='heading1' onClick={()=>navigation('/todo')}>Todo-List</button>
    </div>   
    </div>
       <div className='todo'>
    
    </div>
<div className='bot'>
<img className='botimage' src={Botimage} alt="botimage"  onClick={()=>navigation('/chatbot')}/>

</div>
<div className='filesystem'>
<select className='list' onChange={(e) => handleshow(Number(e.target.value))}>
    <option value="">Select file</option>
   {files.map((filename,index)=>(
    <option key={index} value={index}> {typeof filename === 'string' ? filename : filename.name}</option>
   ))}
   </select><br/>
   </div> 
   <div className='pdfsection'style={{ display: 'flex', height: '100vh' }}>
   { selectedfileurl ?(
    selectedfiletype.includes('pdf')?(
      <iframe
      src={selectedfileurl} 
       title="PDF Preview"
      ></iframe>
    ):(
      <img
      src={selectedfileurl}
      alt="preview"

      />
    )):(
      <p> no files selected</p>
    )

   }
   </div>
</div>
  )
}

export default profile
// // selectedFileType === 'pdf' ? (
//         <iframe
//           src={selectedFileUrl}
//           width="100%"
//           height="100%"
//           style={{ border: 'none', minHeight: '90vh' }}
//           title="PDF Preview"
//         />
//       ) : (
//         <img
//           src={selectedFileUrl}
//           alt="Preview"
//           style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
//         />
//       )
//     )