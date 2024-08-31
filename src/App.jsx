import React, { useState, useEffect } from 'react';
import './navbar.css'
import './animations'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    // The jQuery code will be executed as it's already included in jqueryAnimations.js
  }, []);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>

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
        <div className="hamburger" onClick={toggleDropdown}>
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

      <div>

      <h1 className='testing-scroll'> HELOOWWWW</h1>

      </div>

    </div>
  )
}

export default App

// $(function(){
//   var str = '#len'; //increment by 1 up to 1-nelemnts
//   $(document).ready(function(){
//     var i, stop;
//     i = 1;
//     stop = 4; //num elements
//     setInterval(function(){
//       if (i > stop){
//         return;
//       }
//       $('#len'+(i++)).toggleClass('bounce');
//     }, 500)
//   });
// });
