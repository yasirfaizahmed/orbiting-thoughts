import React, {useState} from 'react';
import '../styles/navbar.css'

function Navbar() {
  // navbar dropdown for smaller screens
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <nav className="navbar">
        <div className="brand">
            <a href="#">Deen & Dunya</a>
        </div>
        <div className="nav-links">
            <a className='hoverable' href="#">Home</a>
            <a className='hoverable' href="#">About</a>
            <a className='hoverable' href="#">Services</a>
            <a className='hoverable' href="#">Contact</a>
        </div>
        <div className="nav-buttons">
            <button className="login">Sign in</button>
            <button className="signup">Sign up</button>
        </div>
        <div className="hamburger" onClick={() => setDropdownVisible(!isDropdownVisible)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}>
            <a className='hoverable' href="#">Home</a>
            <a className='hoverable' href="#">About</a>
            <a className='hoverable' href="#">Services</a>
            <a className='hoverable' href="#">Contact</a>
            <div className="dropdown-buttons">
              <button className="login">Sign in</button>
              <button className="signup">Sign up</button>
            </div>
            
        </div>
      </nav>
  );
}

export default Navbar;