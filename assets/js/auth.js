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
        // alert('Signup successful');
        const data = await response.json();
        setAuthenticated(true, data.token);

        const sessionToken = data.token;
        localStorage.setItem('token', sessionToken);
        
        var closeButton = document.getElementById('closeSignup');
        if (closeButton) {
            closeButton.click();
        }
    } else {
        const errorData = await response.json();
        alert('Signup failed' + errorData.detail);
    }
}

async function handleLogin() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Encrypt the password before sending
    const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('http://127.0.0.1:9000/signin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password: encryptedPassword })
    });

    if (response.ok) {
        alert('Login successful');
        const data = await response.json();
        setAuthenticated(true, data.token);
        
        const sessionToken = data.token;
        localStorage.setItem('token', data.token);
        
        var closeButton = document.getElementById('closeSignin');
        if (closeButton) {
            closeButton.click();
        }
    } else {
        alert('Login failed');
    }
}


function setAuthenticated(isAuthenticated, data=null) {
    document.getElementById('profileButton').style.display = 'block';
    if (isAuthenticated) {
        document.getElementById('closeSignup').click();
        document.getElementById('closeSignin').click();
        document.getElementById('signupButton').style.display = 'none';
        document.getElementById('signinButton').style.display = 'none';
        localStorage.setItem('isAuthenticated', 'true');
        if (token) {
            localStorage.setItem('token', token);
        }
    } else {
        document.getElementById('signupButton').style.display = 'block';
        document.getElementById('signinButton').style.display = 'block';
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
    }
}