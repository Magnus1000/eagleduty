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

// Function to toggle the dropdown menu for the profile menu
document.addEventListener('DOMContentLoaded', function() {
    var profileMenu = document.getElementById('profileMenu');
    var profileIcon = document.getElementById('profileMenuIcon');
    var profileDropdown = document.getElementById('profileDropdown');

    profileMenu.addEventListener('click', function() {
        profileDropdown.classList.toggle('open');
        profileIcon.classList.toggle('open');
        profileMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = profileDropdown.contains(event.target) || profileMenu.contains(event.target);
        var isProfileMenuOpen = profileMenu.classList.contains('open');

        if (!isClickInside && isProfileMenuOpen) {
            profileDropdown.classList.remove('open');
            profileIcon.classList.remove('open');
            profileMenu.classList.remove('open');
        }
    });
});
