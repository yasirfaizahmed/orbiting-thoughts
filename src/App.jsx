import React, { useState, useEffect } from 'react';
import './js/animations'
import './styles/index.css'
import Navbar from './components/navbar'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    // The jQuery code will be executed as it's already included in jqueryAnimations.js
  }, []);


  return (
    <div>

      <Navbar />

    </div>
  )
}

export default App
