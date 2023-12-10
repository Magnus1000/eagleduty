document.addEventListener('DOMContentLoaded', function() {
    // Get the element with ID 'expandCollapse'
    var expandCollapseButton = document.getElementById('expandCollapse');

    // Check if the element exists
    if (expandCollapseButton) {
        // Add a click event listener to the button
        expandCollapseButton.addEventListener('click', function() {
            // Get the 'changelogDrawer' and 'dashboardContent' elements
            var changelogDrawer = document.getElementById('changelogDrawer');
            var dashboardContent = document.getElementById('dashboardContent');

            // Toggle the 'hidden' class on the 'changelogDrawer'
            if (changelogDrawer) {
                changelogDrawer.classList.toggle('hidden');
            } else {
                console.error("Element with ID 'changelogDrawer' not found.");
            }

            // Toggle the 'wide' class on the 'dashboardContent'
            if (dashboardContent) {
                dashboardContent.classList.toggle('wide');
            } else {
                console.error("Element with ID 'dashboardContent' not found.");
            }
        });
    } else {
        console.error("Element with ID 'expandCollapse' not found.");
    }
});
