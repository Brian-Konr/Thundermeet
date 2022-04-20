import { useState } from 'react'
import Home from './routes/Home';
import PersonalPage from './routes/PersonalPage';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/personal' element={<PersonalPage />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
