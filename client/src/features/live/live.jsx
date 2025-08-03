import { useEffect } from "react"
import { useState } from "react"
import io from "socket.io-client"
const socket=io("http://localhost:3000")
const Chat=()=>{
const [userName,setUserName]=useState("")
const [message,setMessage]=useState("")
const [chat,setChat]=useState([])

return(
    <div>
        
    </div>
)


}
export default Chat