import React, {useState, useEffect} from 'react';
import '../styles/navbar.css';
import CONFIG from '../js/config';
import { useNavigate, useLocation} from 'react-router-dom';
import getHeaders from '../js/utils';


function Navbar({ setToken,
                  setSigninSignupButtonVisible,
                  isSigninSignupButtonsVisible,
                  openSigninModal,
                  closeSigninModal,
                  isSigninModalVisible,
                  openSignupModal,
                  closeSignupModal,
                  isSignupModalVisible,
                  isDropdownVisible,
                  setDropdownVisible }) {


  const [isLoading, setLoading] = useState(false);
  
  // navigation varaibles
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  


  //profileButton handler
  const handleProfileButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.PROFILE}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        const statusCode = response.status;
        if (statusCode == 401){
          alert('Session Expired: Please sign in again');
          setToken('');
          openSigninModal();    // Show the signin modal
          return;
        } else {
          setToken('');
          openSigninModal();    // Show the signin modal
          throw new Error('Network response was not ok ' + response.statusText);
        }
      }

      const data = await response.json();
      console.log('GET Response:', data);

      // Store the profile data in localStorage or handle it as needed
      localStorage.setItem('profileData', JSON.stringify(data));

    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      setLoading(false); // Set loading to false once data is fetched
    }

    // Only navigate if the current location is not already /profile
    if (location.pathname !== '/profile') {
      navigate('/profile');
    }
  };


  // signupButton click handler
  const handleSignup = async (event) => {
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
    {isLoading &&(
      <>
        <div className="loading-spinner-container">
          {/* Loading spinner */}
          <div className="spinner-border" role="status" style={{position: 'center'}}>
            <span className="sr-only"></span>
          </div>
        </div>
      </>
    )}

    <nav className="navbar" id='navbarId'>
      <div className="brand">
          <a href="/">Deen & Dunya</a>
      </div>
      <div className="nav-links">
          <a className='hoverable' href='/' onClick={() => navigate('/')}>Home</a>
          <a className='hoverable' href="/create">Create</a>
          <a className='hoverable' href="/read">Read</a>
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
          <a className='hoverable' href="/">Home</a>
          <a className='hoverable' href="/create">Create</a>
          <a className='hoverable' href="/read">Read</a>
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
