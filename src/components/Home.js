import React from 'react'
import { Link, useMatch, useResolvedPath, } from "react-router-dom";
import quiz from './quiz.png';
import puzzle from './puzzle.png';

const Home = () => {
  return (
    <div>
        <div className="container text-center mt-5">
            <div className='row'>
                <div className='col me-5'>
                    <div className="border border-dark border-3 position-relative rounded" style={{height:`200px`}}>
                        <Link to="/quiz" className="nav-link">
                        <img src={quiz} alt="" />
                        </Link>
                    </div>
                    <br />
                    <div className="border border-dark border-3 position-relative rounded" style={{backgroundColor:`darkred`, height:`200px`}}>
                        <h2 className='text-light position-absolute top-50 start-50 translate-middle'>Arrume o DNA</h2>
                        <button className='btn btn-light position-absolute bottom-0 start-50 translate-middle'><Link to="/DNAGame" className="nav-link">Iniciar</Link></button>
                    </div>
                </div>
                <div className='col me-5'>
                <div className="border border-dark border-3 position-relative rounded" style={{height:`200px`}}>
                        <Link to="/puzzle" className="nav-link">
                        <img src={puzzle} alt="" />
                        </Link>
                    </div>
                    <br />
                    <div className="border border-dark border-3 position-relative rounded" style={{backgroundColor:`darkred`, height:`200px`}}>
                        <h2 className='text-light position-absolute top-50 start-50 translate-middle'>Arrume o DNA</h2>
                        <button className='btn btn-light position-absolute bottom-0 start-50 translate-middle'><Link to="/DNAGame" className="nav-link">Iniciar</Link></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home