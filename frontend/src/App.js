//REACT
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//HOOKS
import { useAuthContext } from './hooks/useAuthContext'

//CSS
import './App.css'

//PAGES
import Home from './page/Home'
import Task from './page/Task'
import Login from './page/Login'
import Signup from './page/Signup'

//COMPONENTS
import Nav from './components/Nav'

function App() {
  const {user} = useAuthContext()
  console.log(process.env.REACT_APP_PRODUCTION === 'true' ? 'true' : 'false')
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
        <Route path='' element={!user ? <Login/> : <Navigate to='Home'/>}/>
          <Route path='Signup' element={!user ? <Signup/> : <Navigate to='Home'/>}/>
          <Route path='Home' element={user ? <Home/> : <Navigate to='/'/>}/>
          <Route path='Input' element={user ? <Task/> : <Navigate to='/'/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
