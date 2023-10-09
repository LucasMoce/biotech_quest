import React from 'react'
import { Link, useMatch, useResolvedPath, } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <div className="container">
            <div className="grid-item">
                <img src={require('./logot.png')} alt="Imagem 1" />
                <button><Link to="/quiz" className="nav-link">Quiz</Link></button>
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
  )
}

export default Home