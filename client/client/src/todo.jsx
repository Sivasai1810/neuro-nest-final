import React, { useEffect, useState } from 'react';
import axios from 'axios'
function Todo() {
  const [input, setInput] = useState("");    
  const [tasks, setTasks] = useState([
    "yourtaskare"
  ]);
  const [message,setMessage]=useState([])
    const userId=localStorage.getItem("userId");   
useEffect( ()=>{
  const fetchdata=async()=>{
  const res=await axios.get(`http://localhost:2022/todo/get?userId=${userId}`);
  const textarea=res.data.usertext;
  setTasks(textarea);
 
}
fetchdata();
},[]) 
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const addTask = async(e) => {
    try{
e.preventDefault()
  const res = await axios.post("http://localhost:2022/todo", {
          userId: userId,
          tasks: input
        });

        console.log(res.data.message);

       
        setTasks([...tasks,input]);
        setInput(""); 
      }
  catch(error){
  console.log("error",error);
}

  }
  
  return (
    <div>
      <p className='heading1'>Todo-List</p>
      <input 
        type='text' 
        value={input} 
        onChange={handleInputChange} 
      /><br />
      <button className='add' onClick={addTask}>Add-Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task},<button>Delete</button></li>
          
        ))}
      </ul>
       {/* <ul>
        {message.map((task, index) => (
          <li key={index}>{task},<button>Delete</button></li>
          
        ))}
      </ul> */}
      
    </div>
  );

}
export default Todo;

