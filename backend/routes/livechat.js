import express from "express"
import  { createServer}  from "http"
import { Server } from "socket.io"
const app=express()
const server=createServer(app)
const  io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["Get","Post"]

    }}
)
io.on("connection",(Socket)=>{
Socket.on("send_message",(data)=>{
    Socket.emit("receive_message",data)

})
})

export default server

