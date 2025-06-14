import React, { useState } from 'react'
import { useEffect } from 'react'
function profile() {
   const [message5,setMessage5]=useState('')
    useEffect(()=>{
       
const res=axios.get("http://192.168.43.70:2023/profile",{
    withCredentials:true
   
})
setMessage5(res.data.username)  },[])


  return (
    <div>
      <p>{message5}</p>
    </div>
  )
}

export default profile

   
   
