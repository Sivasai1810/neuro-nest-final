require('dotenv').config()
const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
const { connectdb } =require('./db')
const createroute=require("./routes/create")
const loginroute=require("./routes/login")
const dashboardroute=require('./routes/dashboard')
const apibot=require('./routes/apibot')
const todo=require('./routes/todo');
try{
connectdb()
app.use('/api/create',createroute)
app.use('/api/login',loginroute)
app.use('/api/dashboard',dashboardroute)
app.use('/gemini',apibot)
app.use('/todo',todo);  
 console.log("somthingggggggg is wrong ")
}catch(error)
{
    console.log("somthin is wrong ",error)
}
const port=process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))