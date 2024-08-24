// import CONFIG from './config.js';


// signup handler
async function handleSignup() {

    const username = document.getElementById('username').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
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
}

// signin handler
async function handleSignin() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Encrypt the password before sending
    // const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('http://172.105.58.91:80/signin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
    });

    if (response.ok) {
        const data = await response.json();
        
        const sessionToken = data.token;
        console.log('Token received on signup:', sessionToken); // Debug log
        sessionStorage.setItem('token', sessionToken);
        
        // update the navbar
        updateNavbarSection();

        // close the modal
        var closeButton = document.getElementById('closeSignin');
        if (closeButton) {
            closeButton.click();
        }
        alert("Signin successfull");
    } else {
        alert('Signin failed');
    }
}
