document.addEventListener('DOMContentLoaded', function() {
    const descriptionDivs = document.querySelectorAll('.example-description-div');

    descriptionDivs.forEach(function(div) {
        div.addEventListener('click', function() {
            const chatSearch = document.getElementById('chatSearch');
            if (chatSearch) {
                chatSearch.value = div.textContent;
                const inputEvent = new Event('input');
                chatSearch.dispatchEvent(inputEvent);
            }
        });
    });
});
