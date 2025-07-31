
import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from './login'
import Create from './create'
import Profile from './profile'
import Chatbot from './chatbot'
import Livechat from './live'
import Notes from './notes'
import './App.css'
import './Chat.css'
import Todo from './todo'

function App() {
 

  return (
    <BrowserRouter>
         <Routes>
          <Route path='/create' element={<Create />}/>
<Route path='live' element={<Livechat/>} />
           <Route path='/profile' element={<Profile />}/>
           <Route path ='*' element={<Login />}/>
            <Route path ='/chatbot' element={<Chatbot />}/>
               <Route path ='/todo' element={<Todo />}/>
          <Route path='/notes' element={<Notes />}></Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App
