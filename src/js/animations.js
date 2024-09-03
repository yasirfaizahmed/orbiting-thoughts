window.addEventListener("scroll", function() {
    const heroContainer = document.querySelector('.hero-container');
    let scrollPosition = window.scrollY;
    
    // Adjust the background size based on scroll position
    let scale = 100 + scrollPosition / 10; // Adjust the division factor to control zoom speed
    heroContainer.style.backgroundSize = `${scale}% auto`;
});


// window.addEventListener('scroll', function() {
//     const navbar = document.getElementById('navbarId');
//     const maxScroll = 0; // Adjust this value to control when the navbar becomes fully opaque
//     const scrollY = window.scrollY;

//     // Calculate opacity based on scroll position
//     let opacity = Math.min(scrollY / maxScroll, 1);
//     navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
// });