import React, { useState } from 'react'
import axios from 'axios'
import close from './assets/close.png'
import {useNavigate} from 'react-router-dom';
export default function Notes() {
      const navigate=useNavigate();
      const [notes,setNotes]=useState("hello");
      const [message,setMessage]=useState("");
      const userId=localStorage.getItem("userId");

      const hadlesavenotes=async()=>{
const res=await axios.post("http://localhost:2022/notes",{
 userId,
 notes}
)
if(res.data.success===false){
  alert(res.data.message);
}
console.log(notes)
      }
      const handlenotes=(e)=>{
setNotes(e.target.value);
      }
  return (
    <div>
        <h1 className='heading1'>Add-Notes </h1>
      <textarea  onChange={handlenotes}className='textarea'value={notes} placeholder='says cheers'> </textarea>
      <img className="closebar"src={close} alt="*"  onClick={()=>{navigate('/todo')}}/>
      <button  className='save' onClick={hadlesavenotes}>save</button>
    </div>
  )
}
