import React, { useEffect, useRef, useState } from 'react'


function Stopwatch() {
  const [isruning,setIsruning]=useState(false)
  const [elapsedtime ,setElapsedtime]=useState(0)
  const IntervalIdRef=useRef(null)
  const starttimeRef=useRef(0)
useEffect(()=>{
  if(isruning  && starttimeRef.current !== 0){
  IntervalIdRef.current=setInterval(()=>{
        setElapsedtime(Date.now()-starttimeRef.current)
  },10)
  }
  return () => clearInterval(IntervalIdRef.current);
},[isruning])



const handlestart=(e)=>{
  e.preventDefault()
  setIsruning(true)
  starttimeRef.current=Date.now()-elapsedtime
}
const handlestop=()=>{
  setIsruning(false)
}
const handlerestart=()=>{
  setIsruning(false)
  setElapsedtime(0)
}
const format=()=>{
  let hours=Math.floor(elapsedtime/(60*60*1000))
  let minutes=Math.floor(elapsedtime/(60*1000)%60)
  let seconds=Math.floor(elapsedtime/(1000)%60)
  let milliseconds=Math.floor((elapsedtime%1000)/10)
      hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
   milliseconds= String(milliseconds).padStart(2, '0');
  return (
   `${hours}:${minutes}:${seconds}`
  )


}
  return (
    <div>
   <p className='format'>{format()}</p>
   <button type='button' className ="start"onClick={handlestart}>start</button>
   <button type='button' className="stop" onClick={handlestop}>stop </button>
   <button type='button'  className="restart"onClick={handlerestart}>restart </button>
    </div>
  )
}

export default Stopwatch
