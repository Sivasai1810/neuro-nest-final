import React, { useEffect, useState } from 'react';
import axios from 'axios'
import plus from "../../assets/plus.png"
import {useNavigate} from 'react-router-dom';
import Close from "../../components/closes"
function Todo() {
  const navigate=useNavigate();
  const [input, setInput] = useState("");    
  const [tasks, setTasks] = useState([
   
  ]);
    const userId=localStorage.getItem("userId");   
useEffect( ()=>{
  const fetchdata=async()=>{
  const res=await axios.get(`https://neuro-nest-final.onrender.com/todo/get?userId=${userId}`);
  const textarea=res.data.usertext;
  setTasks(textarea);
 
}
fetchdata();
},[]) 

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const addTask = async(e) => {
    console.log("hello");
    try{
e.preventDefault()
  const res = await axios.post("https://neuro-nest-final.onrender.com/todo", {
          userId: userId,
          tasks: input
        });

  

       
        setTasks([...tasks,input]);
        setInput(""); 
      }
  catch(error){
  console.log("error",error);
}
  }
const deleteTask=async(index)=>{
const res=await axios.post("https://neuro-nest-final.onrender.com/todo/delete",{
  userId,
  index

})
alert(res.data.message);
window.location.reload();

} 
const handlenotes=(index)=>{
 navigate('/notes')
 localStorage.setItem("todoindex",index);
}

  return (
    <div className='todo1'>
      <p className='heading1'>Todo-List</p>
      <input className='input'
        type='text' 
        value={input} 
        onChange={handleInputChange} 
         onKeyDown={(e) => e.key === "Enter" && addTask(e)}
      /><br />
      <button className='uploadfile' onClick={addTask}>Add-Task</button>
   <table className="todo-table">
  <thead>
    <tr>
      <th>Todo</th>
      <th>Add Notes</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map((task, index) => (
      <tr  className='texts' key={index}>
        <td >{task}</td>
        <td className='image'><img  src={plus} alt="+"  onClick={()=>handlenotes(index)}/></td>
        <td className='image'><button  className='delete'onClick={() => deleteTask(index)}>Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>
  <Close />
    </div>
  );

}
export default Todo;

