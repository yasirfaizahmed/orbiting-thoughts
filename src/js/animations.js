window.addEventListener("scroll", function() {
    const heroContainer = document.querySelector('.hero-container');
    let scrollPosition = window.scrollY;
    
    // Adjust the background size based on scroll position
    let scale = 100 + scrollPosition / 10; // Adjust the division factor to control zoom speed
    heroContainer.style.backgroundSize = `${scale}% auto`;
});
