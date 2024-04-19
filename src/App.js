import React, { useEffect, useState } from 'react'
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
  const [singleFavDetails, setSingleFavDetails] = useState(0);
  const [Contextid, setContextId] = useState("");
  const [searchedData, setSearchedData] = useState(() => {
    const storedData = localStorage.getItem('searchedData');
    return storedData ? JSON.parse(storedData) : [];
  })

  useEffect(() => {
    localStorage.setItem('searchedData', JSON.stringify(searchedData));
  }, [searchedData]);

  return (
    <Router>
      <MyContext.Provider value={{ ContextData_FevId, setContextData_FevId, Contextid, setContextId, searchedData, setSearchedData, singleFavDetails, setSingleFavDetails }}>
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

