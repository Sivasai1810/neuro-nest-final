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
const res=await  axios.post("https://neuro-nest-final.onrender.com/api/create",data)

 const userId=res.data.userId
 localStorage.setItem("userId",userId);
setMessage1(res.data.message)
if(res.data.success){
    alert(res.data.message)
 navigate('/profile')
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
    <div>
     <div className="images">
    <div className="image33">
      <h1 className="headingf">welcome to the neuro-nest</h1><br/>
      <h3 className="headingf">Neuro Nest Your Smart Study Hub
Organize, track, and master your learning journey with AI-powered tools and a clean workspace.</h3>
     </div>
    </div>
     <div className="login">
         <h3>Create  your account</h3>
    <h5 className="names">Enter your detials below  <br/>your account </h5>
        <h7 className="name">Username</h7><br/>
    <input className="inputs" type="text" value={data.username} name="username" onChange={handlepush}  placeholder="username"/><br/>
      <h7 className="name">Password</h7><br/>
    <input className="inputs" type="text" value={data.password} name="password" onChange={handlepush}  placeholder="password"/><br/>
      <h7 className="name "style={{ "padding-right":"260px" }}>Email</h7><br/>
    <input  className="inputs" type="text" value={data.email} name="email" onChange={handlepush}  placeholder="email"/><br/>
    <button className ="button2" type="submit" onClick={handlenewpage}>create-account</button><br></br>
     <Link className="link" to ='/login'>Login</Link>
    <p className="next">{message1}</p>
    </div>
</div>

</form>
)}
export default Create