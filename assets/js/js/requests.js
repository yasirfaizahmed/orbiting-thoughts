// header to every request made after signin/signup
function getHeaders(form=false) {
    const token = sessionStorage.getItem('token'); // Or wherever you store your token
    // const email = localStorage.getItem('email'); // Or wherever you store the user's email
    
    if(form){
        return {
            'Authorization': `Bearer ${token}`
        };
    }
    else{
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
    
}



// document.getElementById('deenCard').addEventListener('click', () => {
//     fetch('http://127.0.0.1:9000/deen/')
//         .then(response => response.json())
//         .then(data => console.log('GET Response:', data))
//         .then(window.location.href = 'pages/deen.html')
//         .catch(error => console.error('Error:', error));
// });

// document.getElementById('dunyaCard').addEventListener('click', () => {
//     fetch('http://127.0.0.1:9000/dunya/')
//         .then(response => response.json())
//         .then(data => console.log('GET Response:', data))
//         .then(window.location.href = 'pages/dunya.html')
//         .catch(error => console.error('Error:', error));
// });



document.getElementById('profileButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://127.0.0.1:9000/profile/', {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            const statusCode = response.status;
            if (statusCode == 401){
                alert('Session Expired: Please sign in again');
                // Show the signin modal
                const signinModal = new bootstrap.Modal(document.getElementById('signin'));
                signinModal.show();
                return;
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }

        const data = await response.json();
        console.log('GET Response:', data);

        // Store the profile data in localStorage or handle it as needed
        sessionStorage.setItem('profileData', JSON.stringify(data));

        // make DOM changes to view profile
        showSection('profile', true);        // for dev

        // homeSection.style.display = 'none';     // for dev
        // profileSection.style.display = 'block';     // for dev
        showProfile();      // for dev6
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('updateProfileButton').addEventListener('click', async () => {
    try {
        // Get the input values
        const username = document.getElementById('newUsernameInput').value;
        const about = document.getElementById('aboutYourselfInput').value;
        const password = document.getElementById('newPasswordInput').value;
        const profileImage = document.getElementById('customFile1').files[0];

        // Create a new FormData object
        const formData = new FormData();
        formData.append('username', username);
        formData.append('about', about);
        formData.append('password', password);
        formData.append('picture', profileImage);

        const response = await fetch('http://127.0.0.1:9000/edit-profile/', {
            method: 'POST',
            headers: getHeaders(form=true), // Ensure this function is defined correctly to not include 'Content-Type'
            body: formData
        });

        if (!response.ok) {
            const statusCode = response.status;
            if (statusCode == 401){
                alert('Session Expired: Please sign in again');
                // Show the signin modal
                const signinModal = new bootstrap.Modal(document.getElementById('signin'));
                signinModal.show();
                return;
            } else{
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }

        const data = await response.json();
        console.log('GET Response:', data);

        // Store the profile data in localStorage or handle it as needed
        sessionStorage.setItem('profileData', JSON.stringify(data));

        // show profile
        showProfile();
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('deenCard').addEventListener('click', async () => {
    try {
        const response = await fetch('http://127.0.0.1:9000/deen/', {
            method: 'GET',
            headers: getHeaders()
        });

        // TODO: fetch deen articles here

        // make DOM changes to view profile
        showSection('deen', true); 

    } catch (error) {
        console.error('Error:', error);
    }
});
