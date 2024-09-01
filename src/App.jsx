import React, { useState, useEffect } from 'react';
import './js/animations'
// import './js/bg-resize'
import './styles/index.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Purpose from './components/purpose'


// Import Google Fonts
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    // The jQuery code will be executed as it's already included in jqueryAnimations.js
  }, []);


  return (
    <div className='main-page'>

      <Navbar />

      <Hero />

      <Purpose />

    </div>
  )
}

export default App
