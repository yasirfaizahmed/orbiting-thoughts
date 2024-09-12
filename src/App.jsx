import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Create from './components/create'
import Read from './components/read'
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

  // lifted session state
  // signin, signup button state
  const [isSigninSignupButtonsVisible, setSigninSignupButtonVisible] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  useEffect(() => {   // attaching hook to update localStorage when token state changes
    if (token) {
      setSigninSignupButtonVisible(false);
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
      setSigninSignupButtonVisible(true);
    }
  }, [token]);

  // navbar dropdown for smaller screens
  const [isDropdownVisible, setDropdownVisible] = useState(false);

   // signin modal handler
    const [isSigninModalVisible, setSigninModalVisible] = useState(false);
    const openSigninModal = () => {
      setSigninModalVisible(true);  // set isSigninModalVisible to true
      setDropdownVisible(false);    // set isDropdownVisible to false
    }
    const closeSigninModal = () => {
      setSigninModalVisible(false);
    }

    // signup modal handler
    const [isSignupModalVisible, setSignupModalVisible] = useState(false);
    const openSignupModal = () => {
      setSignupModalVisible(true);   // set isSignupModalVisible to true
      setDropdownVisible(false);    // set isDropdownVisible to false
    }
    const closeSignupModal = () => {
      setSignupModalVisible(false);
    }

  return (
    <Router>
      <div className='main-page'>
        <Navbar setToken={setToken} 
                setSigninSignupButtonVisible={setSigninSignupButtonVisible} 
                isSigninSignupButtonsVisible={isSigninSignupButtonsVisible}
                openSigninModal={openSigninModal}
                closeSigninModal={closeSigninModal}
                isSigninModalVisible={isSigninModalVisible}
                openSignupModal={openSignupModal}
                closeSignupModal={closeSignupModal}
                isSignupModalVisible={isSignupModalVisible}
                isDropdownVisible={isDropdownVisible}
                setDropdownVisible={setDropdownVisible}/>

        {/* Define the routes */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<><Hero /><Purpose /></>} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile setToken={setToken}
                                                   openSigninModal={openSigninModal}/>} />
        
          {/* Create article route */}
          <Route path="/create" element={<Create />}></Route>

          {/* Create article route */}
          <Route path="/read" element={<Read />}></Route>

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
