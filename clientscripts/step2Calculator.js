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

// Adding Event Listeners to Calculate Duty Button
function addCalculateDutyEventListener(callback) {
    document.querySelector("#calculateDuty").addEventListener("click", callback);
}

// Main Function
function calculateDuty(productValue, specialRates, generalRate, quantity, isoCode) {
    const specialDutyRate = specialRates.special_json[isoCode] || "";
    console.log('Special Duty Rate:',specialDutyRate);
    const duty = productValue * generalRate * quantity;
    return duty;
}

addCalculateDutyEventListener(calculateDutyAndTariffs);