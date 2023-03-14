import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Header from './components/Header/Header'
function App() {
  return (
    <div className='app'>
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Homepage />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

