import React, { useState } from 'react'
import testeImage from './logot.png'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import trofeu from './trofeu.png';

const Navbar = () => {

  const [pontos, setPontos] = useState(0);

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div style={{marginLeft:`5%`}} className='col md-10'>
            <Link to="/" className="navbar-brand fw-bold">
              <img src={testeImage} alt="" style={{width:`20%`}} />
            </Link> 
          </div>
          <div className='d-flex position-relative'>
            <img src={trofeu} alt="" style={{width:`10%`}} />
            <h4 className='mt-3 ms-2'>{pontos} pontos</h4>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar