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

document.getElementById('profileButton').addEventListener('click', () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');


    fetch('http://127.0.0.1:9000/profile/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, email })
    })
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .then(window.location.href = 'pages/profile.html')
        .catch(error => console.error('Error:', error));
});
