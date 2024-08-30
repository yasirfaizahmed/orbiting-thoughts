import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './navbar.css'
import './narbar-animation'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    // The jQuery code will be executed as it's already included in jqueryAnimations.js
  }, []);

  return (
    <div>

      <a className="navbar-brand" id="brand" href="#">
        Deen & Dunya
      </a>

      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a id="len1" className="hoverable navbar-text" href="#">Home</a></li>
            <li><a id="len2" className="hoverable navbar-text" href="#">About</a></li>
            <li><a id="len3" className="hoverable navbar-text" href="#">Portfolio</a></li>
            <li><a id="len4" className="hoverable navbar-text" href="#">Contact</a></li>
          </ul>
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
