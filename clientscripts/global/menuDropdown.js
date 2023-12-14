// Function to toggle the dropdown menu for the tools menu
document.addEventListener('DOMContentLoaded', function() {
    var toolsMenu = document.getElementById('toolsMenu');
    var toolsIcon = document.getElementById('toolsMenuIcon');
    var toolsDropdown = document.getElementById('toolsDropdown');

    if (toolsMenu && toolsIcon && toolsDropdown) {
        toolsMenu.addEventListener('click', function() {
            toolsDropdown.classList.toggle('open');
            toolsIcon.classList.toggle('open');
            toolsMenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(event) {
        var isClickInside = toolsDropdown && toolsDropdown.contains(event.target) || toolsMenu && toolsMenu.contains(event.target);
        var isToolsMenuOpen = toolsMenu && toolsMenu.classList.contains('open');

        if (toolsDropdown && toolsIcon && toolsMenu && !isClickInside && isToolsMenuOpen) {
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

    if (profileMenu && profileIcon && profileDropdown) {
        profileMenu.addEventListener('click', function() {
            profileDropdown.classList.toggle('open');
            profileIcon.classList.toggle('open');
            profileMenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(event) {
        var isClickInside = profileDropdown && profileDropdown.contains(event.target) || profileMenu && profileMenu.contains(event.target);
        var isProfileMenuOpen = profileMenu && profileMenu.classList.contains('open');

        if (profileDropdown && profileIcon && profileMenu && !isClickInside && isProfileMenuOpen) {
            profileDropdown.classList.remove('open');
            profileIcon.classList.remove('open');
            profileMenu.classList.remove('open');
        }
    });
});

// Function to toggle the dropdown menu for the resources menu
document.addEventListener('DOMContentLoaded', function() {
    var resourcesMenu = document.getElementById('resourcesMenu');
    var resourcesIcon = document.getElementById('resourcesMenuIcon');
    var resourcesDropdown = document.getElementById('resourcesDropdown');

    if (resourcesMenu && resourcesIcon && resourcesDropdown) {
        resourcesMenu.addEventListener('click', function() {
            resourcesDropdown.classList.toggle('open');
            resourcesIcon.classList.toggle('open');
            resourcesMenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(event) {
        var isClickInside = resourcesDropdown && resourcesDropdown.contains(event.target) || resourcesMenu && resourcesMenu.contains(event.target);
        var isResourcesMenuOpen = resourcesMenu && resourcesMenu.classList.contains('open');

        if (resourcesDropdown && resourcesIcon && resourcesMenu && !isClickInside && isResourcesMenuOpen) {
            resourcesDropdown.classList.remove('open');
            resourcesIcon.classList.remove('open');
            resourcesMenu.classList.remove('open');
        }
    });
});