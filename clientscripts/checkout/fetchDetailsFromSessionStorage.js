function setSessionStorageValues() {
    const query = sessionStorage.getItem("query");
    const htsno = sessionStorage.getItem("htsno");
    const description = sessionStorage.getItem("description");
    const uuid = localStorage.getItem('uuid');

    const hsQueryElement = document.getElementById("hsQuery");
    const hsCodeElement = document.getElementById("hsCode");
    const hsDescriptionElement = document.getElementById("hsDescription");
    const searchResultsCheckoutElement = document.getElementById("searchResultsCheckout");
    const checkoutCheckboxElement = document.getElementById("checkoutCheckbox");

    if (query && htsno && description) {
        hsQueryElement.textContent = query;
        hsCodeElement.textContent = htsno;
        hsDescriptionElement.textContent = description;
        searchResultsCheckoutElement.style.display = "flex";
        checkoutCheckboxElement.name = JSON.stringify([query, htsno, description, uuid]);
    } else {
        searchResultsCheckoutElement.style.display = "none";
        checkoutCheckboxElement.name = "";
    }
}

window.addEventListener("DOMContentLoaded", setSessionStorageValues);