import React, { useEffect } from 'react'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SettingsPage from "./pages/SettingsPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import { useAuthStore } from './store/useAuthStore.js'

const App = () => {
  const {authUser,checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  
  console.log(authUser);

  return (
    <div>
       
       <Navbar />

       <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/settings' element={<SettingsPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
       </Routes>
    </div>
  );
}

export default App
