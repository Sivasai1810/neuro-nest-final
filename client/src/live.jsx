import { useEffect } from "react"
import { useState } from "react"
import io from "socket.io-client"
const socket=io("http://localhost:3000")
const Chat=()=>{
    const userid=localStorage.getItem("userId")
    const id=userid[0]
    console.log(id)
    const[message,setMessage]=useState("")
    const[messages,setMessages]=useState([])
    const [received,setReceived]=useState("")
   const sendMessage=()=>{
        socket.emit("send_message",{message})
        setMessages([...messages,message])
        setMessage("")
   }
useEffect(()=>{
socket.on("receive_message",(data)=>{
    setReceived(data.message)
})
},[socket])


return(
    <div className="socket">
          {messages.map((item,index)=>(
     <p className="chattext" key={index}>(userName){item}</p>
   ))}
       
        <input type="text" placeholder="Message ...." onChange={(e)=>{setMessage(e.target.value)}} value={message}></input>
        <button onClick={sendMessage} className="sendchat">Send</button>
 
    </div>
)


}
export default Chat