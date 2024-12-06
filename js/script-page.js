const sidebar = document.querySelector('.sidebar');
const sketchContainer = document.querySelector('#sketch-container');

// See More button click handler
document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    sidebar.classList.add('expanded');
    sketchContainer.classList.add('shrunk');
});

// Close button click handler
document.querySelector('.sidebar-close').addEventListener('click', function() {
    sidebar.classList.remove('expanded');
    sketchContainer.classList.remove('shrunk');
});