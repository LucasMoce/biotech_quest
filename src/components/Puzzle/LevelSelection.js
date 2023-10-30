import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LevelSelection.css';

const LevelSelection = ({puzzleLevelsCheck}) => {
  console.log(puzzleLevelsCheck)
  const levels = Array.from({ length: 9 }, (_, index) => index + 1);

  const handleLevelClick = (level) => {
      window.location.href = `/puzzle/${level}`;
  };
  
  return (
    <div className="level-container text-center">
      <h1>Selecione um Nível</h1>
      <div className="level-grid">
        {levels.map(level => (
          <Link
          className="level-button"
          to={`/puzzle/${level}`}
          disabled={level !== 1 && !puzzleLevelsCheck[level-1]}
          >
          <h2>Nível {level}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;