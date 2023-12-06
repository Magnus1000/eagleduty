// Fetches the values from session storage and sets them in the DOM 
function setSessionStorageValues() {
    const query = sessionStorage.getItem("query");
    const htsno = sessionStorage.getItem("htsno");
    const description = sessionStorage.getItem("description");

    const hsQueryElement = document.getElementById("hsQuery");
    const hsCodeElement = document.getElementById("hsCode");
    const hsDescriptionElement = document.getElementById("hsDescription");
    const searchResultsCheckoutElement = document.getElementById("searchResultsCheckout");

    if (query && htsno && description) {
        hsQueryElement.textContent = query;
        hsCodeElement.textContent = htsno;
        hsDescriptionElement.textContent = description;
        searchResultsCheckoutElement.style.display = "flex";
    } else {
        searchResultsCheckoutElement.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded", setSessionStorageValues);