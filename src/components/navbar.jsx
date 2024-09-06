import React, {useState, useEffect} from 'react';
import '../styles/navbar.css'
import CONFIG from '../js/config'
import '../js/utils'


function Navbar({setProfileVisible}) {
  // navbar dropdown for smaller screens
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // signup modal handler
  const [isSignupModalVisible, setSignupModalVisible] = useState(false);
  const openSignupModal = () => {
    setSignupModalVisible(true);   // set isSignupModalVisible to true
    setDropdownVisible(false);    // set isDropdownVisible to false
  }
  const closeSignupModal = () => {
    setSignupModalVisible(false);
  }

  // signin modal handler
  const [isSigninModalVisible, setSigninModalVisible] = useState(false);
  const openSigninModal = () => {
    setSigninModalVisible(true);  // set isSigninModalVisible to true
    setDropdownVisible(false);    // set isDropdownVisible to false
  }
  const closeSigninModal = () => {
    setSigninModalVisible(false);
  }

  // signin, signup button state
  const [isSigninSignupButtonsVisible, setSigninSignupButtonVisible] = useState(true);


  // session state
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  useEffect(() => {   // attaching hook to update localStorage when token state changes
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [token]);


  //profileButton handler
  const handleProfileButtonClick = () => {
    setProfileVisible(prevState => !prevState);  // Toggle profile visibility
  };


  // signupButton click handler
  const handleSignup = async () => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const username = document.getElementById('signupUsernameId').value;
    const email = document.getElementById('signupEmailId').value;
    const password = document.getElementById('signupPasswordId').value;
    
    const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      const data = await response.json();
      
      const sessionToken = data.token;
      // console.log('Token received on signup:', sessionToken);
      setToken(sessionToken);   // storing token

      // close the modal
      var closeButton = document.getElementById('closeSignup');
      if (closeButton) {
        closeButton.click();
      }
      alert("Signup successfull");
      closeSignupModal();   // close the modal after successfull signup
      setSigninSignupButtonVisible(false);    // hide the signin signup buttons
    } else {
      alert('Signup failed');
      setToken('');   // clear token state
    }
  }

  const handleSignin = async () => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const email = document.getElementById('signinEmailId').value;
    const password = document.getElementById('signinPasswordId').value;

    // Encrypt the password before sending
    // const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.SIGNIN}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    if (response.ok) {
      const data = await response.json();
      
      const sessionToken = data.token;
      // console.log('Token received on signup:', sessionToken);
      setToken(sessionToken);   // storing token

      // close the modal
      var closeButton = document.getElementById('closeSignin');
      if (closeButton) {
        closeButton.click();
      }
      alert("Signin successfull");
      closeSigninModal();   // close the modal after successfull signin
      setSigninSignupButtonVisible(false);    // hide the signin signup buttons
    } else {
      alert('Signin failed');
      setToken('');   // clear token state
    }
  }

  // effect hook for attaching and detaching signupButton handler onclick when modal is visible
  useEffect(() => {
    // button event listener attachement, and detachment cleanup
    const signupButton = document.getElementById('signupSubmitButtonId');
    if (signupButton && isSignupModalVisible) {   // only attach handler when both modal and button are visible
      signupButton.addEventListener('click', handleSignup);
    }

    return () => {    // detach the handler
      if (signupButton) {
        signupButton.removeEventListener('click', handleSignup);
      }
    };
  }, [isSignupModalVisible]);   // dependencies, this effect will trigger if this dependency changes its state

  // effect hook for attaching and detaching signinButton handler onclick when modal is visible
  useEffect(() => {
    const signinButton = document.getElementById('signinSubmitButtonId');
    if (signinButton && isSigninModalVisible) {   // only attach handler when both modal and button are visible
      signinButton.addEventListener('click', handleSignin);
    }

    return () => {    // detach the handler
      if (signinButton) {
        signinButton.removeEventListener('click', handleSignin);
      }
    };
  }, [isSigninModalVisible]);   // dependencies, this effect will trigger if this dependency changes its state

  return (
    <>

    <nav className="navbar" id='navbarId'>
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
        {isSigninSignupButtonsVisible && (    // conditional rendering of signin, signup buttons
          <>
            <button className="login" onClick={openSigninModal}>Sign in</button>
            <button className="signup" onClick={openSignupModal}>Sign up</button>
          </>
          )}

        {!isSigninSignupButtonsVisible && (   // conditional rendering of profile button
          <>
            <button className='profileButton' onClick={handleProfileButtonClick}>
              <img src="https://img.icons8.com/ios-glyphs/30/user--v1.png"></img>
            </button>
          </>
        )}
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
            {isSigninSignupButtonsVisible && (    // conditional rendering of signin, signup buttons
            <>
              <button className="login" onClick={openSigninModal}>Sign in</button>
              <button className="signup" onClick={openSignupModal}>Sign up</button>
            </>
            )}

            {!isSigninSignupButtonsVisible && (   // conditional rendering of profile button
              <>
                <button className='profileButton' onClick={handleProfileButtonClick}>
                  <img src="https://img.icons8.com/ios-glyphs/30/user--v1.png"></img>
                </button>
              </>
            )}
          </div>
          
      </div>
    </nav>

    {isSignupModalVisible && (    //conditional rendering of modals
      <div className="signup-modal">
          <div className="modal-content">
              <span className="close" onClick={closeSignupModal}>&times;</span>
              <h2>Sign Up</h2>
              <form className='signupForm'>
                <input type="email" id="signupEmailId" name="email" required placeholder="Email"/>
                <input type="username" id="signupUsernameId" name="username" required placeholder="User name"/>
                <input type="password" id="signupPasswordId" name="password" required placeholder="Password"/>
                <button className="signupSubmitButton" id="signupSubmitButtonId" type="submit">Sign Up</button>
              </form>
          </div>
      </div>
    )}

    {isSigninModalVisible && (    //conditional DOM rendering
      <div className="signup-modal">
          <div className="modal-content">
              <span className="close" onClick={closeSigninModal}>&times;</span>
              <h2>Sign In</h2>
              <form className='signupForm'>
                <input type="email" id="signinEmailId" name="email" required placeholder="Email"/>
                <input type="password" id="signinPasswordId" name="password" required placeholder="Password"/>
                <button className="signupSubmitButton" id="signinSubmitButtonId" type="submit">Sign In</button>
              </form>
          </div>
      </div>
    )}
  </>
  );
}

export default Navbar;
