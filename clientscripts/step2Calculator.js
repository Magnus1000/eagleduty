// DOM Utility Functions
function getSelectedResultAttribute(attribute) {
    const selectedResultCard = document.querySelector("#selectedResult");
    return selectedResultCard.getAttribute(attribute);
}

function getProductValue() {
    return parseFloat(document.querySelector("#productValue").value);
}

function getQuantity() {
    return parseFloat(document.querySelector("#quantity").value);
}

function getImportingFromValue() {
    return document.querySelector("#importingFrom").value;
}

function setSelectedDutyText(duty) {
    document.querySelector("#dutyTotal").innerHTML = `Total Duty: $${duty}`;
}

function addCalculateDutyEventListener(callback) {
    document.querySelector("#calculateDuty").addEventListener("click", callback);
}

// Duty Calculation Logic
function parseSpecialRates(specialJSON) {
    const rates = JSON.parse(specialJSON); // Parse the JSON string
    return rates;
}

function calculateDutyRate(isoCode, specialRates, generalRate) {
    return specialRates[isoCode] ? specialRates[isoCode] : generalRate;
}

function calculateDuty(productValue, quantity, dutyRate, generalRate) {
    if (isNaN(dutyRate)) { // Specific duty calculation
        const ratePerUnit = parseFloat(generalRate.split('/')[0].replace('$', ''));
        return quantity * ratePerUnit;
    } else { // Ad valorem duty calculation
        return productValue * dutyRate;
    }
}

function calculateTotalCost(productValue, duty, additionalFees) {
    return productValue + duty + additionalFees;
}

// Main Function
function calculateDutyAndTariffs() {
    const htsno = getSelectedResultAttribute('data-htsno');
    console.log('HTSPO:', htsno);
    const generalRate = getSelectedResultAttribute('data-general');
    console.log('General Rate:', generalRate);
    const specialJSON = getSelectedResultAttribute('data-special-json');
    console.log('Special JSON:', specialJSON);
    const additionalFees = parseFloat(getSelectedResultAttribute('data-other') || 0);
    console.log('Additional Fees:', additionalFees);
    const productValue = getProductValue();
    console.log('Product Value:', productValue);
    const quantity = getQuantity();
    console.log('Quantity:', quantity);
    const isoCode = getImportingFromValue();
    console.log('ISO Code:', isoCode);

    const specialRates = parseSpecialRates(specialJSON);
    const dutyRate = calculateDutyRate(isoCode, specialRates, generalRate);
    const duty = calculateDuty(productValue, quantity, dutyRate, generalRate);
    const totalCost = calculateTotalCost(productValue, duty, additionalFees);

    console.log(`HTS Number: ${htsno}, Product Value: $${productValue}, Duty: $${duty}, Total Cost: $${totalCost}, ISO Code: ${isoCode}, Special: ${specialJSON}`);
    setSelectedDutyText(duty);
}

addCalculateDutyEventListener(calculateDutyAndTariffs);