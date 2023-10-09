import React from 'react'
import testeImage from './logot.png'
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div style={{marginLeft:`5%`}}>
            <Link to="/" className="navbar-brand fw-bold">
              <img src={testeImage} alt="" style={{width:`25%`}} />
            </Link> 
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar