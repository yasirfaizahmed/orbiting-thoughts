async function handleSignup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Encrypt the password before sending
    // const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('http://127.0.0.1:9000/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Signup successful');
        const data = await response.json();
        setAuthenticated(true, data.access_token);
        // document.getElementById('gg').style.display = 'none';
        // $('#signin').modal('hide');
        
        // var myModalEl = document.getElementById('signup');
        // var modal = bootstrap.Modal.getInstance(myModalEl);
        // modal.hide();
        
        // $('#signup').modal('hide');
        // var myModal = new bootstrap.Modal(document.getElementById('signup'), options);
        // myModal.hide();
        
        // document.getElementById("signup").innerHTML = "";
        var closeButton = document.getElementById('closeSignup');
        if (closeButton) {
            closeButton.click();
        }
    } else {
        const errorData = await response.json();
        // alert('Signup failed' + errorData.detail);
    }
}

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Encrypt the password before sending
    const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: encryptedPassword })
    });

    if (response.ok) {
        alert('Login successful');
    } else {
        alert('Login failed');
    }
}


function setAuthenticated(isAuthenticated, data=null) {
    if (isAuthenticated) {
        document.getElementById('closeSignup').click();
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