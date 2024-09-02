import React, {useState} from 'react';
import '../styles/navbar.css'

function Navbar() {
  // navbar dropdown for smaller screens
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // modal handler
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
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
          <button className="login">Sign in</button>
          <button className="signup" onClick={openModal}>Sign up</button>
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
            <button className="login" >Sign in</button>
            <button className="signup" onClick={openModal}>Sign up</button>
          </div>
          
      </div>
    </nav>

    {isModalVisible && (
      <div className="signup-modal">
          <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Sign Up</h2>
              <form className='signupForm'>
                <input type="email" id="email" name="email" required placeholder="Email"/>
                <input type="password" id="password" name="password" required placeholder="Password"/>
                <button className="signupSubmitButton" type="submit">Sign Up</button>
              </form>
          </div>
      </div>
    )}
  </>
  );
}

export default Navbar;