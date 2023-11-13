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

//Step 1: Calculate the general duty
function calculateGeneralDuty(generalRate, productValue, quantity) {
    const ratePerUnit = parseFloat(generalRate.split('/')[0].replace('$', ''));
    const duty = productValue * quantity * ratePerUnit;
    return duty;
}

//Step 2: Calculate the special duty
function calculateSpecialDuty(isoCode, specialRates, productValue, quantity) {
    const specialDutyRate = specialRates[isoCode];
    const duty = specialDutyRate ? productValue * quantity * specialDutyRate : 0;
    return duty;
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

    //Step 1: Calculate the general duty
    let duty = calculateGeneralDuty(generalRate, productValue, quantity);
    console.log('General Rate:', duty);

    // Parsing the special field
    const specialRates = parseSpecialRates(specialJSON);

    //Step 2: Calculate the special duty rate
    let duty = calculateSpecialDuty(isoCode, specialRates, productValue, quantity);
    console.log('Special Rate:', duty);

    console.log(`HTS Number: ${htsno}, Product Value: $${productValue}, Duty: $${duty}, Total Cost: $${totalCost}, ISO Code: ${isoCode}, Special: ${specialJSON}`);
    setSelectedDutyText(duty);
}

addCalculateDutyEventListener(calculateDutyAndTariffs);