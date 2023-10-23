import React from 'react';
import { Link } from 'react-router-dom';
import './LevelSelection.css';

const LevelSelection = () => {
  const levels = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    <div className="level-container text-center">
      <h1>Selecione um Nível</h1>
      <div className="level-grid">
        {levels.map(level => (
          <Link
            key={level}
            to={`/puzzle/${level}`}
            className="level-button"
          >
            <h2>Nível {level}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;