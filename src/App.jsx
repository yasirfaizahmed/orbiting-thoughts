import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './js/animations'
// import './js/auth'
// import './js/config'
// import './js/bg-resize'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './styles/index.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Purpose from './components/purpose'
import Footer from './components/footer'
import Profile from './components/profile'
// import 'bootstrap/dist/css/bootstrap.min.css'



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

  return (
    <Router>
      <div className='main-page'>
        <Navbar />

        {/* Define the routes */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<><Hero /><Purpose /></>} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
