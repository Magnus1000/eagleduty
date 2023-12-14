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

// Function to toggle the dropdown menu for the resources menu
document.addEventListener('DOMContentLoaded', function() {
    var mobileResourcesButton = document.getElementById('mobileResourcesDropdownButton');
    var mobileResourcesIcon = document.getElementById('mobileResourcesIcon');
    var mobileResourcesList = document.getElementById('mobileResourcesDropdownList');

    mobileResourcesButton.addEventListener('click', function() {
        mobileResourcesList.classList.toggle('open');
        mobileResourcesIcon.classList.toggle('open');
        mobileResourcesButton.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = mobileResourcesList.contains(event.target) || mobileResourcesButton.contains(event.target);
        var isResourcesMenuOpen = mobileResourcesButton.classList.contains('open');

        if (!isClickInside && isResourcesMenuOpen) {
            mobileResourcesButton.classList.remove('open');
            mobileResourcesIcon.classList.remove('open');
            mobileResourcesList.classList.remove('open');
        }
    });
});