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

// Main Function
function calculateDutyAndTariffs() {
    const htsno = getSelectedResultAttribute('data-htsno');
    console.log('HTSPO:', htsno);
    const generalRate = getSelectedResultAttribute('data-general') ? parseFloat(getSelectedResultAttribute('data-general')) / 100 : '';
    console.log('General Rate:', generalRate);
    const specialJSON = getSelectedResultAttribute('data-special-json');
    console.log('Special JSON:', specialJSON);
    const otherRate = getSelectedResultAttribute('data-other') ? parseFloat(getSelectedResultAttribute('data-other')) : '';
    console.log('Other Rate:', otherRate);
    const productValue = getProductValue();
    console.log('Product Value:', productValue);
    const quantity = getQuantity();
    console.log('Quantity:', quantity);
    const isoCode = getImportingFromValue();
    console.log('ISO Code:', isoCode);

    // Parsing the special field
    const specialRates = parseSpecialRates(specialJSON);

    //Step 2: Calculate the special duty rate
    function calculateSpecialDuty(isoCode, specialRates, productValue, quantity) {
        const specialDutyRate = specialRates[isoCode];
        if (typeof specialDutyRate === "number") {
            const duty = productValue * quantity * specialDutyRate;
            console.log('Special Rate:', specialDutyRate);
            return duty;
        } else if (typeof specialDutyRate === "string") {
            console.log('Special Rate:', specialDutyRate);
            return null;
        } else if (typeof specialDutyRate === "undefined") {
            console.log('Special Rate:', specialDutyRate);
            return null;
        } else {
            const specialDutyRateFloat = parseFloat(specialDutyRate);
            if (isNaN(specialDutyRateFloat)) {
                console.log('Special Rate:', specialDutyRate);
                return null;
            } else {
                const duty = productValue * quantity * specialDutyRateFloat;
                console.log('Special Rate:', specialDutyRateFloat);
                return duty;
            }
        }
    }

    //Step 1: Calculate the duty
    let duty = 0;
    function calculateDuty(productValue, specialRates, generalRate, quantity, isoCode) {
        duty = productValue * quantity * generalRate;
        console.log('Step 1: General Duty:', duty);
        if (specialRates !== null) {
            const specialDuty = calculateSpecialDuty(isoCode, specialRates, productValue, quantity);
            if (specialDuty !== null) {
                duty = specialDuty;
            }
        }
        console.log('Step 2: Duty After Checking Specials', duty);
    }
    // Call the calculateDuty function
    calculateDuty(productValue, specialRates, generalRate, quantity, isoCode);

    console.log(`HTS Number: ${htsno}, Product Value: $${productValue}, Duty: $${duty}, ISO Code: ${isoCode}, Special: ${specialJSON}`);
    setSelectedDutyText(duty);
}

addCalculateDutyEventListener(calculateDutyAndTariffs);