import React from 'react'
import { Link, useMatch, useResolvedPath, } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <div className="container text-center mt-5">
            <div className='row'>
                <div className="col me-5 position-relative border border-dark border-3" style={{backgroundColor:`darkred`, height:`200px`}}>
                    <h2 className='text-light position-absolute top-50 start-50 translate-middle'>Quiz</h2>
                    <button className='btn btn-light position-absolute bottom-0 start-50 translate-middle'><Link to="/quiz" className="nav-link">Iniciar</Link></button>
                </div>
                <div className="col me-5 position-relative  border border-dark border-3" style={{backgroundColor:`darkred`}}>
                    <h2 className='text-light position-absolute top-50 start-50 translate-middle'>Puzzle</h2>
                    <button className='btn btn-light position-absolute bottom-0 start-50 translate-middle'><Link to="/puzzle" className="nav-link">Iniciar</Link></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home