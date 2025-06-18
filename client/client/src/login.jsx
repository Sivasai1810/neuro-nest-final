import axios from "axios";
 import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import image from './assets/mainpage.png'
import "./index.css"
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
setMessage1(res.data.message)
console.log(res.data.message)
if (res.data.success === true) {

  alert(res.data.message);
  navigate('/profile');
  console.log(message1)

}
}
catch(error){
    console.log("unable to fetch data",error)
}
}

return(
<form  onSubmit={handleroute}>
  <div className="login">
  <h1 className="heading">welcome to the neuro-nest</h1><br/>
    <input className="inputs" type="text" value={data.username} name="username" onChange={handlepush}  placeholder="username"/><br/>
    <input  className="inputs" type="text" value={data.password} name="password" onChange={handlepush}  placeholder="password"/><br/>
    <button  className ="button"type="submit">LOGIN</button><br/>
      <Link className="link" to ='/create'>Create Account</Link><br/>
    <p className="next2">{message1}</p></div>
   


</form>
)}
export default Login