// Get the button element
const backButton = document.getElementById('backButton');

// Add a click event listener to the button
backButton.addEventListener('click', () => {
    // Navigate back to the previous page
    window.history.back();
});