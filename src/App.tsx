import React from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import { DETAIL_PATH, MAIN_PATH, UPDATE_PATH, WRITE_PATH } from './constant';
import Home from './board/main';
import Write from './board/write';
import Update from './board/update';
import Detail from './board/detail';


function App() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/write" element={<Write/>}/>
    <Route path="/update/:boardNumber" element={<Update/>}/>
    <Route path="/detail/:boardNumber" element={<Detail/>}/>
   </Routes>
  );
}

export default App;
