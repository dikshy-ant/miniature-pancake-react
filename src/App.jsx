import React, { useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/PLayer/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if(user) {
      console.log("User is logged in:", user);
      setIsAuthenticated(true);
      // Only redirect to home if we're on the login page
      if (location.pathname === '/login') {
        navigate('/');
      }
    } else {
      console.log("No user is logged in");
      setIsAuthenticated(false);
      // Only redirect to login if we're not already on login page and not on player page
      if (location.pathname !== '/login' && !location.pathname.startsWith('/player/')) {
        navigate('/login');
      }
    }
  });

  return () => unsubscribe();
 }, [navigate, location.pathname])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element = {isAuthenticated ? <Home /> : <Login />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/player/:id' element = {isAuthenticated ? <Player /> : <Login />} />
      </Routes>
      
    </div>
  )
}

export default App

