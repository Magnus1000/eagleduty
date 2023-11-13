// Reading Values of Form
const selectedResultCard = document.querySelector("#selectedResult");
const productValue = parseFloat(document.querySelector("#productValue").value);
const quantity = parseFloat(document.querySelector("#quantity").value);
const isoCode = document.querySelector("#importingFrom").value;
const dutyTotal = document.querySelector("#dutyTotal");
const htsno = selectedResultCard.getAttribute('data-htsno');
const generalRate = selectedResultCard.getAttribute('data-general') ? parseFloat(selectedResultCard.getAttribute('data-general')) / 100 : '';
const specialJSON = selectedResultCard.getAttribute('data-special-json');
const otherRate = selectedResultCard.getAttribute('data-other') ? parseFloat(selectedResultCard.getAttribute('data-other')) : '';

console.log('Product Value:',productValue,'Quantity:',quantity,'ISO Code:',isoCode,'HTS No:',htsno,'General Rate:',generalRate,'Special JSON:',specialJSON,'Other Rate:',otherRate);

// Main Function
function calculateDuty(productValue, specialJSON, generalRate, quantity, isoCode) {
    const specialDutyRate = specialJSON.special_json[isoCode] || "";
    console.log('Special Duty Rate:',specialDutyRate);
    const duty = productValue * generalRate * quantity;
    console.log('Duty:',duty);
    return duty;
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    const button = document.querySelector("#calculateDuty");

    // Attach the event listener to the button
    button.addEventListener("click", function() {
        // Get the input values
        const selectedResultCard = document.querySelector("#selectedResult");
        const productValue = parseFloat(document.querySelector("#productValue").value);
        const specialJSON = selectedResultCard.getAttribute('data-special-json');
        const generalRate = selectedResultCard.getAttribute('data-general') ? parseFloat(selectedResultCard.getAttribute('data-general')) / 100 : '';
        const quantity = parseFloat(document.querySelector("#quantity").value);
        const isoCode = document.querySelector("#importingFrom").value;

        // Call the calculateDuty function with the input values
        calculateDuty(productValue, specialJSON, generalRate, quantity, isoCode);
    });
});