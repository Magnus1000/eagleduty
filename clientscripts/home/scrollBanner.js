// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Find the tickertape element by ID
  var tickertape = document.getElementById('tickertape');

  // Set initial position to the full width of the tickertape element
  // This assumes that the tickertape element is wider than its container
  var pos = tickertape.offsetWidth;

  // Function to move the tickertape from right to left
  function moveTickertape() {
    // Decrease position
    pos--;

    // Apply the new position
    tickertape.style.transform = 'translate3d(' + (-pos) + 'px, 0, 0)';

    // Reset the position to create an infinite loop effect
    if (pos <= 0) {
      pos = tickertape.offsetWidth;
    }

    // Continue moving the tickertape
    requestAnimationFrame(moveTickertape);
  }

  // Start moving the tickertape
  moveTickertape();
});
