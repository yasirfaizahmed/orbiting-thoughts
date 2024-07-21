


document.getElementById('deenCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/deen')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .catch(error => console.error('Error:', error));
    window.location.href = 'deen.html';
});

document.getElementById('dunyaCard').addEventListener('click', () => {
    fetch('http://127.0.0.1:9000/dunya')
        .then(response => response.json())
        .then(data => console.log('GET Response:', data))
        .catch(error => console.error('Error:', error));
    window.location.href = 'dunya.html';
});