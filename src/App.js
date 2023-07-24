import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom';

import Model from './Components/Model';
import Eda from './Components/Eda';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Model />} />
        <Route exact path="/eda" element={<Eda />} />
      </Routes>
    </div>
  )
}

export default App