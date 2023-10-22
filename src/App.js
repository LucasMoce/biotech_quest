import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import DNAGame from './components/DNAGame';
import { Route, Routes } from "react-router-dom";


function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/DNAGame" element={<DNAGame />} />    
      </Routes>
    </div>
  );
}

export default App;
