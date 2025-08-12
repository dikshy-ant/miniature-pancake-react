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
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed:", user ? "User logged in" : "No user");
    if(user) {
      setIsAuthenticated(true);
      // Only redirect to home if we're on the login page
      if (location.pathname === '/login') {
        navigate('/');
      }
    } else {
      setIsAuthenticated(false);
      // Only redirect to login if we're not already on login page and not on player page
      if (location.pathname !== '/login' && !location.pathname.startsWith('/player/')) {
        navigate('/login');
      }
    }
    setIsLoading(false);
  });

  return () => unsubscribe();
 }, [navigate, location.pathname])

  return (
    <div>
      <ToastContainer theme='dark' />
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: 'white',
          backgroundColor: '#000'
        }}>
          Loading...
        </div>
      ) : (
        <Routes>
          <Route path='/' element = {isAuthenticated ? <Home /> : <Login />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/player/:id' element = {isAuthenticated ? <Player /> : <Login />} />
        </Routes>
      )}
      
    </div>
  )
}

export default App

