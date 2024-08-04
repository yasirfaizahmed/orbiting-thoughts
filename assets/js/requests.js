function getHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    // const email = localStorage.getItem('email'); // Or wherever you store the user's email
    
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}



document.getElementById('deenCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/deen/')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .then(window.location.href = 'pages/deen.html')
        .catch(error => console.error('Error:', error));
});

document.getElementById('dunyaCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/dunya/')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .then(window.location.href = 'pages/dunya.html')
        .catch(error => console.error('Error:', error));
});



document.getElementById('profileButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://127.0.0.1:9000/profile/', {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('GET Response:', data);

        // Store the profile data in localStorage or handle it as needed
        localStorage.setItem('profileData', JSON.stringify(data));

        // Redirect to the profile page
        window.location.href = 'pages/profile.html';
    } catch (error) {
        console.error('Error:', error);
    }
});
