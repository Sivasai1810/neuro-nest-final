import axios from "axios";
 import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import person from "../src/assets/booksai.png"
import "./index.css"
function Login(){
  const navigate=useNavigate()
const [data,setData]=useState({
    username:"",
    password:"",
})
const [message1,setMessage1]=useState("")
const handlepush=(e)=>{
  setMessage1("")
    setData((d)=>({
  ...d,
  [e.target.name]:e.target.value
    }))
}
const handleroute= async(e)=>{
e.preventDefault()
try{
const res=await  axios.post("https://neuro-nest-final.onrender.com/api/login",data,{
    withCredentials:true
})
setMessage1(res.data.message)
localStorage.setItem("userId",res.data.userId);
setData({
   username:"",
    password:"",
})
if (res.data.success === true) {
  alert(res.data.message);
  navigate('/profile');

}
}
catch(error){
    console.log("unable to fetch data",error)
}
}


return(
<form onSubmit={handleroute}>
 <div className="component">
  <div className="images">
    <div className="image33">
      <h1 className="headingf">welcome to the neuro-nest</h1>
      <h3 className="headingf">Neuro Nest Your Smart Study Hub
Organize, track, and master your learning journey with AI-powered tools and a clean workspace.</h3>
     </div>
    </div>
  <div className="login">
    <h3>Login to your account</h3>
    <h5 className="names">Enter your username below login to <br/>your account </h5>
     <h7 className="name">Username</h7><br/>
    <input className="inputs" type="text" value={data.username} name="username" onChange={handlepush}  placeholder="Enter your username"/><br/>
     <h7 className="name">Password</h7><br/>
    <input  className="inputs" type="text" value={data.password} name="password" onChange={handlepush}  placeholder="Enter your  password"/><br/>
    <button  className ="button"type="submit">LOGIN</button><br/>
      <div class="divider">
  <span>or</span>
</div>
<span className="link">Don't have an account?<Link className="links" to='/create'>Signup</Link></span>
    <p className="next2">{message1}</p></div>
</div> 

</form>
)}
export default Login