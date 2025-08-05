import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from './features/auth/login'
import Create from './features/auth/create'
import Profile from './dashboard/profile'
import Chatbot from './features/coretools/chatbot'
import Notes from './features/coretools/notes'
import './App.css'
import './Chat.css'
import Todo from './features/coretools/todo'
import Dashboard from './dashboard/dashboard'

function App() {
  return (
    <BrowserRouter>
         <Routes>
          <Route path='/create' element={<Create />}/>

           <Route path='/profile' element={<Profile />}/>
           <Route path ='*' element={<Login />}/>
            <Route path ='/chatbot' element={<Chatbot />}/>
               <Route path ='/todo' element={<Todo />}/>
          <Route path='/notes' element={<Notes />}></Route>
          <Route path='/live' element={<Live />}></Route>
          <Route path='/dashboard' element={<Dashboard />} ></Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App
