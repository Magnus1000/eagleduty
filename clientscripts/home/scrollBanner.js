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

// Function to toggle the dropdown menu for the tools menu
document.addEventListener('DOMContentLoaded', function() {
    var toolsMenu = document.getElementById('toolsMenu');
    var toolsIcon = document.getElementById('toolsMenuIcon');
    var toolsDropdown = document.getElementById('toolsDropdown');

    toolsMenu.addEventListener('click', function() {
        toolsDropdown.classList.toggle('open');
        toolsIcon.classList.toggle('open');
        toolsMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = toolsDropdown.contains(event.target) || toolsMenu.contains(event.target);
        var isToolsMenuOpen = toolsMenu.classList.contains('open');

        if (!isClickInside && isToolsMenuOpen) {
            toolsDropdown.classList.remove('open');
            toolsIcon.classList.remove('open');
            toolsMenu.classList.remove('open');
        }
    });
});

// Function to toggle the dropdown menu for the tools menu
document.addEventListener('DOMContentLoaded', function() {
    var mobileToolsButton = document.getElementById('mobileToolsDropdownButton');
    var mobileToolsIcon = document.getElementById('mobileMenuIcon');
    var mobileToolsList = document.getElementById('mobileToolsDropdownList');

    mobileToolsButton.addEventListener('click', function() {
        mobileToolsList.classList.toggle('open');
        mobileToolsIcon.classList.toggle('open');
        mobileToolsButton.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = mobileToolsList.contains(event.target) || mobileToolsButton.contains(event.target);
        var isToolsMenuOpen = mobileToolsButton.classList.contains('open');

        if (!isClickInside && isToolsMenuOpen) {
            mobileToolsButton.classList.remove('open');
            mobileToolsIcon.classList.remove('open');
            mobileToolsList.classList.remove('open');
        }
    });
});


// Open and close the mobile menu
document.addEventListener('DOMContentLoaded', function() {
    var mobileMenuOpenButton = document.getElementById('mobileMenuOpen');
    var mobileMenuCloseButton = document.getElementById('mobileMenuClose');
    var mobileMenu = document.getElementById('mobileMenu');

    mobileMenuOpenButton.addEventListener('click', function() {
        mobileMenu.classList.add('open');
    });

    mobileMenuCloseButton.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
    });
});


