import React, {useState} from 'react';
import '../styles/navbar.css'

function Navbar() {
  // navbar dropdown for smaller screens
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // signup modal handler
  const [isSignupModalVisible, setSignupModalVisible] = useState(false);
  const openSignupModal = () => {
    setSignupModalVisible(true);
  }
  const closeSignupModal = () => {
    setSignupModalVisible(false);
  }

  //signin modal handler
  const [isSigninModalVisible, setSigninModalVisible] = useState(false);
  const openSigninModal = () => {
    setSigninModalVisible(true);
  }
  const closeSigninModal = () => {
    setSigninModalVisible(false);
  }

  return (
    <>

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
          <button className="login" onClick={openSigninModal}>Sign in</button>
          <button className="signup" onClick={openSignupModal}>Sign up</button>
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
            <button className="login" onClick={openSigninModal}>Sign in</button>
            <button className="signup" onClick={openSignupModal}>Sign up</button>
          </div>
          
      </div>
    </nav>

    {isSignupModalVisible && (
      <div className="signup-modal">
          <div className="modal-content">
              <span className="close" onClick={closeSignupModal}>&times;</span>
              <h2>Sign Up</h2>
              <form className='signupForm'>
                <input type="email" id="email" name="email" required placeholder="Email"/>
                <input type="username" id="username" name="username" required placeholder="User name"/>
                <input type="password" id="password" name="password" required placeholder="Password"/>
                <button className="signupSubmitButton" type="submit">Sign Up</button>
              </form>
          </div>
      </div>
    )}

    {isSigninModalVisible && (
      <div className="signup-modal">
          <div className="modal-content">
              <span className="close" onClick={closeSigninModal}>&times;</span>
              <h2>Sign In</h2>
              <form className='signupForm'>
                <input type="email" id="email" name="email" required placeholder="Email"/>
                <input type="password" id="password" name="password" required placeholder="Password"/>
                <button className="signupSubmitButton" type="submit">Sign In</button>
              </form>
          </div>
      </div>
    )}
  </>
  );
}

export default Navbar;