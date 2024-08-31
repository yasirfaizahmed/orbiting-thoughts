window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY; // Get current scroll position
    const maxZoom = 200; // Maximum zoom percentage (e.g., 120%)
    const minZoom = 110; // Minimum zoom percentage (starting point)
    const zoomRange = maxZoom - minZoom;

    // Calculate new background size based on scroll position
    const newZoom = minZoom + (scrollPosition / document.body.scrollHeight) * zoomRange;

    // Apply the new zoom value
    document.body.style.backgroundSize = `${newZoom}%`;
});