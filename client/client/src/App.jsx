
import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from './login'
import Create from './create'
import Profile from './profile'
import Entry from './entry'
import Stop from './stopwatch'
import Chatbot from './chatbot'
import Blur from './blur'
import './App.css'

function App() {
 

  return (
    <BrowserRouter>
         <Routes>
          <Route path='/create' element={<Create />}/>
          <Route  path='*' element={<Entry />}/>
           <Route path='/profile' element={<Profile />}/>
           <Route path ='/login' element={<Login />}/>
            <Route path ='/chatbot' element={<Chatbot />}/>
             <Route path ='/blur' element={<Blur />}/>
          
         </Routes>
     </BrowserRouter>
  )
}

export default App
