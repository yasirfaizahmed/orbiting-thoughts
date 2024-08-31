import React, { useState, useEffect } from 'react';
import './navbar.css'
// import './narbar-animation'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // useEffect(() => {
  //   // The jQuery code will be executed as it's already included in jqueryAnimations.js
  // }, []);

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
            <button class="login">Signin</button>
            <button class="signup">Sign Up</button>
        </div>
        <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="dropdown-menu">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <button className="login">Login</button>
            <button className="signup">Sign Up</button>
        </div>
      </nav>

      

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
