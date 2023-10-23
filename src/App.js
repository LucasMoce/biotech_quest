import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import PuzzleWrapper from './components/Puzzle/PuzzleWrapper';
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/quiz" element={<Quiz />} />  
          <Route path="/puzzle/*" element={<PuzzleWrapper />}
        />
      </Routes>
    </div>
  );
}

export default App;
