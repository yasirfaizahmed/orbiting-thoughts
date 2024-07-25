async function handleSignup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Encrypt the password before sending
    const encryptedPassword = btoa(password); // For demonstration, use a proper encryption in production

    const response = await fetch('http://127.0.0.1:9000/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: encryptedPassword })
    });

    if (response.ok) {
        alert('Signup successful');
    } else {
        alert('Signup failed');
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