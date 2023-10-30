import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LevelSelection from './LevelSelection';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';
import Level6 from './Level6';
import Level7 from './Level7';
import Level8 from './Level8';
import Level9 from './Level9';

const PuzzleWrapper = ({aumentarPontos, puzzleLevelsCheck}) => {

  return (
    <Routes>
      <Route path="/" element={<LevelSelection puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/1"} element={<Level1 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/2"} element={<Level2 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/3"} element={<Level3 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/4"} element={<Level4 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/5"} element={<Level5 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/6"} element={<Level6 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/7"} element={<Level7 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/8"} element={<Level8 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
      <Route path={"/9"} element={<Level9 aumentarPontos={aumentarPontos} puzzleLevelsCheck={puzzleLevelsCheck}/>} />
    </Routes>
  );
};


export default PuzzleWrapper;