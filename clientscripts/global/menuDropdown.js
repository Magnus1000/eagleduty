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