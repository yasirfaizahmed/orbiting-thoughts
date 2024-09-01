import React, { useState, useEffect } from 'react';
import './js/animations'
// import './js/bg-resize'
import './styles/index.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Purpose from './components/purpose'
import Footer from './components/footer'


// Import Google Fonts
const anton = document.createElement("link");
anton.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
anton.rel = "stylesheet";
document.head.appendChild(anton);
const cabin = document.createElement("link");
cabin.href = 'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap'
cabin.rel = "stylesheet";
document.head.appendChild(cabin);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // useEffect(() => {
  //   // The jQuery code will be executed as it's already included in jqueryAnimations.js
  // }, []);


  return (
    <div className='main-page'>

      <Navbar />

      <Hero />

      <Purpose />

      <Footer />

    </div>
  )
}

export default App
