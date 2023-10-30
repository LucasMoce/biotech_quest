import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import PuzzleWrapper from './components/Puzzle/PuzzleWrapper';
import DNAGame from './components/DNAGame';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react'


function App() {
  
  const [pontos, setPontos] = useState(0);

  const aumentarPontos = (pp) => {
    setPontos(pontos + pp);
  };

  const [puzzleLevelsCheck, setPuzzleLevelsCheck] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  return (
    <div>
      <Navbar pontos={pontos}/>
      <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/quiz" element={<Quiz aumentarPontos={aumentarPontos}/>} />
          <Route path="/puzzle/*" element={<PuzzleWrapper aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
          <Route path="/DNAGame" element={<DNAGame />} />
      </Routes>
    </div>
  );
}

export default App;
