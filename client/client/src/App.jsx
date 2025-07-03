
import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from './login'
import Create from './create'
import Profile from './profile'
import Entry from './entry'
import Chatbot from './chatbot'
import Notes from './notes'
import './App.css'
import Todo from './todo'

function App() {
 

  return (
    <BrowserRouter>
         <Routes>
          <Route path='/create' element={<Create />}/>
          <Route  path='*' element={<Entry />}/>
           <Route path='/profile' element={<Profile />}/>
           <Route path ='/login' element={<Login />}/>
            <Route path ='/chatbot' element={<Chatbot />}/>
               <Route path ='/todo' element={<Todo />}/>
          <Route path='/notes' element={<Notes />}></Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App
