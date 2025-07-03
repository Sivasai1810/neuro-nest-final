import React from 'react'
import close from './assets/close.png'
import {useNavigate} from 'react-router-dom';
export default function Notes() {
      const navigate=useNavigate();
  return (
    <div>
        <h1 className='heading1'>Add-Notes </h1>
      <textarea className='textarea' placeholder='says cheers'> </textarea>
      <img className="closebar"src={close} alt="*"  onClick={()=>{navigate('/todo')}}/>
      <button  className='save'>save</button>
    </div>
  )
}
