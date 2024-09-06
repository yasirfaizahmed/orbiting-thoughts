import React, { useState, useEffect } from 'react';
import './js/animations'
// import './js/auth'
// import './js/config'
// import './js/bg-resize'
import './styles/index.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Purpose from './components/purpose'
import Footer from './components/footer'
import Profile from './components/profile'


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

  // lifted states, for both navbar.jsx and profile.jsx
  const [isProfileVisible, setProfileVisible] = useState(false);

  return (
    <div className='main-page'>

      {/* passing isProfileVisible setter to Navbar, since it has profile button */}
      <Navbar setProfileVisible={setProfileVisible}/>   

      {isProfileVisible ? <Profile/> : (
        <>
          <Hero />

          <Purpose />
        </>
      )} 
      <Footer />

    </div>
  )
}

export default App;
