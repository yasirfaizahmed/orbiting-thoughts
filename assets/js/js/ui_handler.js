// sections
const homeSection = document.getElementById('index');
const profileSection = document.getElementById('profile');
const deenSection = document.getElementById('deen');
// const dunyaSection = document.getElementById('dunya');
const createArticleSection = document.getElementById('createArticle');


// Define your sections in an object
const sections = {
    home: homeSection,
    profile: profileSection,
    deen: deenSection,
    // dunya: dunyaSection,
    createArticle: createArticleSection,
};

// navbar buttons
const profileButton = document.getElementById('profileButton');
const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton');


// This runs on every page reload/load
updateNavbarSection();
profileSection.style.display = 'none';

// Show the correct section based on the provided section name
function showSection(section, addHistory = true) {
    // Hide all sections
    Object.values(sections).forEach(sec => sec.style.display = 'none');
    
    // Show the selected section
    const activeSection = sections[section];
    if (activeSection) {
        activeSection.style.display = 'block';
        if (addHistory) {
            history.pushState({ section }, '', `/${section}`);
        }
    }

    // Perform specific actions for certain sections if needed
    if (section === 'profile') {
        showProfile();
    }
}


// Update navbar based on session validity
function updateNavbarSection() {
    const token = sessionStorage.getItem('token');
    if (token !== 'dummy' && token !== '' && token != null) {
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
        aboutValue.textContent = parsedData.crud_response.data.profile.about;
        profileImage.src = `data:image/jpeg;base64,${parsedData.crud_response.data.profilePicture}`;
    }
}

// Handle the initial load based on the current path
function handleReload() {
    const path = window.location.pathname;
    if (path === '/profile') {
        showSection('profile', false);       // for dev
        history.replaceState({ section: 'profile' }, '', '/profile');
    } else if (path === '/deen'){
        showSection('deen', false);       // for dev
        history.replaceState({ section: 'deen' }, '', '/deen');
    } else if (path === '/createArticle'){
        showSection('createArticle', false);       // for dev
        history.replaceState({ section: 'createArticle' }, '', '/createArticle');
    } 
    
    else {
        showSection('home', false);     // for dev
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