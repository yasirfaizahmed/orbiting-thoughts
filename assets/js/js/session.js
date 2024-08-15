function handleLoad() {
    document.getElementById('signinButton').style.display = 'none';
    document.getElementById('signupButton').style.display = 'block';
    const sessionToken = localStorage.getItem('token');
    
    if (sessionToken) {
        // User is logged in, hide sign-in buttons
        document.getElementById('signinButton').style.display = 'none';
        document.getElementById('signupButton').style.display = 'none';
    } else {
        // User is not logged in, show sign-in buttons
        document.getElementById('signinButton').style.display = 'block';
        document.getElementById('signupButton').style.display = 'block';
    }
}

// document.addEventListener('DOMContentLoaded', handleLoad);