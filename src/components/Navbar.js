import React, { useState } from 'react'
import testeImage from './potion.png'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import trofeu from './trofeu.png';

const Navbar = () => {

  const [pontos, setPontos] = useState(0);

  return (
    <div>
      <nav class="navbar bg-dark">
        <div className="container-fluid">
          <div style={{marginLeft:`0%`}} className='col md-10'>
            <Link to="/" className="navbar-brand fw-bold text-light fs-2">
              <img src={testeImage} alt="" style={{width:`5%`}} className='me-2 m-2'/>
              BiotechQuest
            </Link>
          </div>
          <div className='d-flex position-relative'>
            <img src={trofeu} alt="" style={{width:`10%`}} />
            <h4 className='mt-3 ms-2 text-light'>{pontos} pontos</h4>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar