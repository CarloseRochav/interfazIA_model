import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Results from './components/Results';
import Home from './Home';

import Navigationbar from './components/Navigationbar';

import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';



function App() {

  const numerosPrimos = [2, 4, 6, 8, 10]

  return (
    <BrowserRouter>  
    {/* Es necesario envolver la App en este elemento para podeer hacer el ruteo */}

      {/* <Videobackground/>       */}
      <Navigationbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/grupos" element={<Results/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>


    </BrowserRouter>

    
  )
}

export default App
