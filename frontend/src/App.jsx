import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  window.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown').forEach(function(dropdown) {
      if (!dropdown.contains(e.target)) {
        // Click was outside the dropdown, close it
        dropdown.open = false;
      }
    });
  });

  const {authUser} = useAuthContext()

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <Signup />} />
        <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
