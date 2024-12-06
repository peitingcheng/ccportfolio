// Only apply horizontal scroll transformation on index page
if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    function transformScroll(event) {
        // Prevent default scroll behavior
        event.preventDefault();
        
        // Get the assignments container
        const container = document.querySelector('.assignments-container');
        
        // Convert vertical scroll (deltaY) to horizontal scroll
        // You can adjust the multiplier (2) to change scroll sensitivity
        container.scrollLeft += event.deltaY * 2;
    }

    // Add event listener to the assignments container
    const container = document.querySelector('.assignments-container');
    container.addEventListener('wheel', transformScroll);
}