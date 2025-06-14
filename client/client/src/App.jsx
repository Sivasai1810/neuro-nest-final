import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from './login'
import Create from './create'
import  Profile  from './profile'
import './App.css'

function App() {
 

  return (
    <BrowserRouter>
         <Routes>
          <Route path='/create' element={<Create />}/>
          <Route  path='*' element={<Login />}/>
          <Route path='/profile' elememt={<Profile />}/>
         </Routes>
     </BrowserRouter>
  )
}

export default App
