
// signup handler
document.getElementById('signupSubmitButtonId').addEventListener('click', async () => {

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
    console.log('Token received on signup:', sessionToken); // Debug log
    sessionStorage.setItem('token', sessionToken);
    
    // update the navbar
    updateNavbarSection();

    // close the modal
    var closeButton = document.getElementById('closeSignup');
    if (closeButton) {
      closeButton.click();
    }
    alert("Signin successfull");
  } else {
    alert('Signup failed');
  }
});