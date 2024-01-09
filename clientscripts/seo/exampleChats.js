document.addEventListener('DOMContentLoaded', function() {
    const descriptionDivs = document.querySelectorAll('.example-description-div');
    const chatSearch = document.getElementById('chatSearch');

    descriptionDivs.forEach(function(div) {
        div.addEventListener('click', function() {
            chatSearch.value = div.textContent;
        });
    });
});
