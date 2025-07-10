import axios from 'axios'
import React, { useEffect, useState } from 'react'

 async function Profile() {
    const [message4,setMessage4]=useState("")
    useEffect(()=>{
       const res=axios.get("http://192.168.43.70:3001/profile",{
    withCredentials:true
})
setMessage4(res.data.username)
    },[])
  return (
    <div>
      {message4}
    </div>
  )
}

export default Profile
