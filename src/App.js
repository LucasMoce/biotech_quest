import React from 'react';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <nav className="Navbar">
      <button className="biot"><img src={require('./logot.png')} alt="a" /></button> 
      </nav>
      <div className="grid-container">
      <div className="grid-item">
        <img src={require('./logot.png')} alt="Imagem 1" />
        <button>Play</button>
      </div>
      <div className="grid-item">
        <img src={require('./logot.png')} alt="Imagem 2" />
        <button>Play</button>
      </div>
      <div className="grid-item">
        <img src={require('./logot.png')} alt="Imagem 3" />
        <button>Play</button>
      </div>
      <div className="grid-item">
        <img src={require('./logot.png')} alt="Imagem 4" />
        <button>Play</button>
      </div>
    </div>
    </div>
  );
}

export default App;
