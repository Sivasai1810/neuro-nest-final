import React from 'react'
import {Link} from "react-router-dom"
function Entry() {
  return (
    <div className='login'>
        <h1 className='heading'> Welcome to the neuro-nest</h1>
      <Link  className="link" to='/login'>Login</Link> <br/>
  
      <Link  className ="link" to ='/create'> Create-account</Link>
    </div>
  )
}

export default Entry
