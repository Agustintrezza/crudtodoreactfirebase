import React from 'react';
import './headerStyled.css'
import {SiFirebase} from 'react-icons/si';
import {SiReact} from 'react-icons/si'
import {Link} from 'react-router-dom'

export const Header = () => {
  return (

    <div className="general">
            <div className="header container d-flex justify-content-between">
            <div className="d-flex">
                <h1 className="h1-header" >React con Firebase <span></span></h1>
                <div className="logos">
                <SiFirebase className="firebase-logo"/>
                <SiReact className="react-logo"/>
            </div>
            </div>

           
            <nav className='d-flex'>
              
                <Link to="/" className="nav-link">crud materialUi</Link>
                <Link to="segundo-form" className='nav-link'>toDo bootstrap</Link>
            </nav>
            </div>
    </div>
    
  )
}

export default Header;