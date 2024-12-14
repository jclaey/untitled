const mediaQuery = window.matchMedia('(max-width: 768px)');
const burgerDiv = document.querySelector('#burger-div');
const menu = document.querySelector('aside.menu');

// Initial states
burgerDiv.style.display = 'none';
menu.style.display = 'none';

// Function to toggle menu visibility
function toggleMenu() {
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Function to handle both initial check and dynamic changes
function handleScreenChange(e) {
    if (e.matches) {
        // Screen width is 768px or less
        burgerDiv.style.display = 'block';
        menu.style.display = 'none'; // Ensure menu is hidden initially

        // Add event listener if not already added
        if (!burgerDiv.hasEventListener) {
            burgerDiv.addEventListener('click', toggleMenu);
            burgerDiv.hasEventListener = true; // Custom property to track listener
        }
    } else {
        // Larger screen: reset styles
        burgerDiv.style.display = 'none';
        menu.style.display = 'none';
    }
}

// Initial check
handleScreenChange(mediaQuery);

// Add event listener for dynamic changes
mediaQuery.addEventListener('change', handleScreenChange);
