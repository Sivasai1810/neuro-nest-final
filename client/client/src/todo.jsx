import React, { useState } from 'react';

function Todo() {
  const [input, setInput] = useState("");    
  const [tasks, setTasks] = useState([]);    

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTask = (e) => {
e.preventDefault()
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput(""); 
    }
  };

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
      
    </div>
  );
}

export default Todo;

