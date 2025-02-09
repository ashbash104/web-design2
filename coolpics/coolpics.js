// Select the menu button and the navigation
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('nav');  // Assuming you have a nav element for your links

// Add an event listener to toggle the menu visibility
menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('visible');  // Add or remove a 'visible' class on the nav
});

// Optional: Responsive behavior check when resizing the window
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1000) {
    navLinks.classList.remove('visible');  // Ensure the nav is always visible on wider screens
  }
});
