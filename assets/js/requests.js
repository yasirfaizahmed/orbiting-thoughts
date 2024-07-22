document.getElementById('deenCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/deen')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .then(window.location.href = 'pages/deen.html')
        .catch(error => console.error('Error:', error));
});

document.getElementById('dunyaCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/dunya')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .then(window.location.href = 'pages/dunya.html')
        .catch(error => console.error('Error:', error));
});