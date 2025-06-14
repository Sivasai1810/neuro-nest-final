import axios from "axios";
 import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
function Login(){
  const navigate=useNavigate()
const [data,setData]=useState({
    username:"",
    password:"",
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
const res=await  axios.post("http://localhost:2023/api/login",data,{
    withCredentials:true
})
console.log(res.data.userId)
setMessage1(res.data.message)
if (res.data.success === true) {

  alert(res.data.message);
  navigate('/profile');
  console.log("ookokokok")

}
}
catch(error){
    console.log("unable to fetch data",error)
}
}

return(
<form onSubmit={handleroute}>
    <input type="text" value={data.username} name="username" onChange={handlepush}  placeholder="username"/><br/>
    <input type="text" value={data.password} name="password" onChange={handlepush}  placeholder="password"/><br/>
    <button type="submit">LOGIN</button>
      <Link className="link" to ='/create'>Create Account</Link>
    <p>{message1}</p>


</form>
)}
export default Login