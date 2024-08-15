// signup handler
async function handleSignup() {

    const username = document.getElementById('username').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    const response = await fetch('http://127.0.0.1:9000/signup/', {
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
        sessionStorage.setItem('session_valid', 'true');
        
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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('session_valid');
    }
}

// signin handler
async function handleSignin() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Encrypt the password before sending
    // const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('http://127.0.0.1:9000/signin/', {
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
        sessionStorage.setItem('session_valid', 'true');
        
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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('session_valid');
    }
}
