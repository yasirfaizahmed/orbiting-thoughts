const homeSection = document.getElementById('index');
const profileSection = document.getElementById('profile');
const profileButton = document.getElementById('profileButton');
const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton')


// this runs on every page reload/load
updateNavbarSection()
profileSection.style.display = 'none';
// showSection('home');


// for showing sections
function showSection(section){
    if(section === 'home'){
        homeSection.style.display = 'block';
        profileSection.style.display = 'none';
        history.pushState({section: 'home'}, '', '/home');
    } else if(section === 'profile'){
        homeSection.style.display = 'none';
        profileSection.style.display = 'block';
        history.pushState({section: 'profile'}, '', '/profile');
    }
}


// update navbar
function updateNavbarSection() {
    const valid_session = sessionStorage.getItem('session_valid');
    if (valid_session == 'true') {
        profileButton.style.display = 'block';
        signupButton.style.display = 'none';
        signinButton.style.display = 'none';
    }
}


// Handle the initial load
function handleInitialLoad() {
    const path = window.location.pathname;
    if (path === '/profile') {
        showSection('profile');
    } else {
        showSection('home');
    }
}


// Handle the browser's back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
      showSection(event.state.section);
    }
});


// Run initial load handler
handleInitialLoad();