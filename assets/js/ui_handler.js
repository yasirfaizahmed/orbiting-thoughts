const homeSection = document.getElementById('index');
const profileSection = document.getElementById('profile');
const profileButton = document.getElementById('profileButton');
const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton');

// This runs on every page reload/load
updateNavbarSection();
profileSection.style.display = 'none';

// Show the correct section based on the provided section name
function showSection(section, addHistory = true) {
    if (section === 'home') {
        homeSection.style.display = 'block';
        profileSection.style.display = 'none';
        if (addHistory) {
            history.pushState({ section: 'home' }, '', '/home');
        }
    } else if (section === 'profile') {
        homeSection.style.display = 'none';
        profileSection.style.display = 'block';
        if (addHistory) {
            history.pushState({ section: 'profile' }, '', '/profile');
        }
        
        // show actual profile details
        showProfile();
    }
}


///////// UI handlers

// Update navbar based on session validity
function updateNavbarSection() {
    const valid_session = sessionStorage.getItem('session_valid');
    if (valid_session === 'true') {
        profileButton.style.display = 'block';
        signupButton.style.display = 'none';
        signinButton.style.display = 'none';
    }
}

function showProfile(){
    const userName = document.getElementById('userName');
    const profileImage = document.getElementById('profileImage');
    const aboutValue = document.getElementById('aboutValue');

    const profileData = sessionStorage.getItem("profileData");
    const parsedData = JSON.parse(profileData);
    if(parsedData){
        userName.textContent = parsedData.crud_response.data.user.username;
        // profileImage.src = 
    }
}



///////// Section Hanlders

// Handle the initial load based on the current path
function handleReload() {
    const path = window.location.pathname;
    if (path === '/profile') {
        showSection('profile', false);
        history.replaceState({ section: 'profile' }, '', '/profile');
    } else {
        showSection('home', false);
        history.replaceState({ section: 'home' }, '', '/home');
    }
}

// Handle the browser's back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
        showSection(event.state.section, false);  // Do not add to history on popstate
    }
});

// Run initial load handler
handleReload();