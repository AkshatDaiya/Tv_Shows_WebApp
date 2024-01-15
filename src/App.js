import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import Shows from './components/Shows';
import ShowDetails from './components/ShowDetails';
import Favorite from './components/Favorite';
import MyContext from './components/MyContext';
import FavShowDetails from './components/FavShowDetails';

function App() {

  const [ContextData_FevId, setContextData_FevId] = useState("");
  const [Contextid, setContextId] = useState("");


  return (
    <Router>
      <MyContext.Provider value={{ ContextData_FevId, setContextData_FevId, Contextid, setContextId }}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/reg' element={<Register />}></Route>
          <Route path='/shows' element={<Shows />}></Route>
          <Route path='/shows_details' element={<ShowDetails />}></Route>
          <Route path='/fav' element={<Favorite />}></Route>
          <Route path='/fav_details' element={<FavShowDetails />}></Route>
        </Routes>
      </MyContext.Provider>
    </Router>
  )
}

export default App

