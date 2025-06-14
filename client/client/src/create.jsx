import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
 import axios from "axios";
function Create(){
   
const navigate=useNavigate()
const [data,setData]=useState({
    username:"",
    password:"",
    email:""
})
const [message1,setMessage1]=useState("")
const handlepush=(e)=>{
    setData((d)=>({
  ...d,
  [e.target.name]:e.target.value
    }))
}
const handleroute= async(e)=>{
e.preventDefault()
try{
const res=await  axios.post("http://localhost:2023/api/create",data)

console.log(res.data.userId)
setMessage1(res.data.message)
if(res.data.success){
    alert(res.data.message)
 navigate('/login')
}
}
catch(error){
    console.log("unable to fetch data",error)
}
}
const handlenewpage=()=>{

}

return(
<form onSubmit={handleroute}>
    <input type="text" value={data.username} name="username" onChange={handlepush}  placeholder="username"/><br/>
    <input type="text" value={data.password} name="password" onChange={handlepush}  placeholder="password"/><br/>
    <input type="text" value={data.email} name="email" onChange={handlepush}  placeholder="email"/><br/>
    <button type="submit" onClick={handlenewpage}>create-account</button>
     <Link className="link" to ='/login'>login</Link>
    <p>{message1}</p>


</form>
)}
export default Create