import React, { useEffect, useRef, useState } from 'react'
import { useNavigate }from 'react-router-dom'
import Stop from './stopwatch'
import Botimage from './assets/bot.png'
import axios from 'axios'
const profile =()=> {
  const userId=localStorage.getItem("userId");
const isFirstRun = useRef(true);
  const[files,setFiles]=useState([])
 const [selectedfiletype,setFiletype]=useState("");
 const [selectedfileurl,setFileurl]=useState("");
  const [listfiles,setListfiles]=useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
     const [openedfiles,setOpenedfiles]=useState([]);
     useEffect(()=>{
if (isFirstRun.current) {
      isFirstRun.current = false; 
      return;
    }

      const getCallSites=()=>{
  console.log("malli vacha")
  setOpenedfiles([""])
      }
      
        getCallSites()
     },[userId])
  useEffect(()=>{
const getlist=async()=>{
  const res= await axios.post("https://neuro-nest.onrender.com/alignpdf",{
    userId:userId
  })
 let listoffiles=res.data.message;
   setFiles(()=>[...listoffiles])
} 
 getlist();
},[])
useEffect(()=>{
 const newlist=JSON.parse(localStorage.getItem("fileslist"));
 if (newlist) {
    setOpenedfiles(newlist); 
  }
  setIsInitialLoad(false);
},[])
useEffect(()=>{
 if (!isInitialLoad) {
    localStorage.setItem("fileslist", JSON.stringify(openedfiles));
  }
},[openedfiles,isInitialLoad])

  const navigation=useNavigate();
  
 const fileInputRef=useRef(null);
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
 const callingRes= await axios.post("https://neuro-nest.onrender.com/callingfiles",{
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
    const res=await axios.post('https://neuro-nest.onrender.com/pdf',formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      console.log("upload response:", res.data);
      alert("uploaded sucessfully")
    if(res.data.status===false){
      setFiles(" ")
    }
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
  const response=await axios.get(`https://neuro-nest.onrender.com/get-signed-url?index=${index}&&userId=${userId}`)
  const url=response.data.url;
 const newwindow= window.open('',"_self");
 const pathname=new URL(url).pathname;
 const filename=pathname.split("/").pop()
 const extension=filename.split(".").pop().toLocaleLowerCase();
  setFiletype(extension);
  setFileurl(url);
const newfilename=filename.split("-").slice(1).join("-").split(".").slice(0,-1).join('.').slice(0,30);
     setOpenedfiles((openedfiles)=>[
      ...openedfiles,
      {
        url:url,
        filesname:newfilename,
        type:extension
      }
     ])
  //}
  }catch(error){
    console.log("error",error);
     alert("Unable to load file.");
  }
};
const handleremove=(indexToRemove)=>{
    const updated = openedfiles.filter((_, index) => index !== indexToRemove);
 setOpenedfiles(updated);
}
const handleideal=(index,url,type)=>{
   setFileurl(url)
   setFiletype(type);
}
  
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
   <div className='pdftable'>
   <table >
    <thead>
      <tr className='fileth'>
        {openedfiles.map((filedata,index)=>(
       <th onClick={()=>handleideal(index,filedata.url ,filedata.type)} className='fileth' key={index}>{filedata. filesname}
       <span onClick={()=>handleremove(index)} className='cross'> ❌</span></th>
        ))}
      </tr>
    </thead>
   </table>
     <div className='pdfsection'>
    
    {
    
      selectedfileurl ?(
        selectedfiletype==='pdf'?(
          <iframe
          className='pdftab'
          src={selectedfileurl}
          title="PDF Preview"
          >
          </iframe>
        ):(
          <img
          className='pdftab1'
          src={selectedfileurl}
          alt='preview'>
          </img>
        )
      ):(
        <h1> no files are selected</h1>
      )
    }
   </div>
   </div>
 
</div>
  )
}

export default profile
