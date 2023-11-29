// Main Function to calculate the duty
function calculateDuty(value, specialJSON, generalRate, quantity, isoCode, amount, amountUnit, currency) {
    console.log('Calculating Duty...');
    // Define Special Duty and Duty variables
    let specialDuty = null;
    let duty = null;
    let ninetyNinePenaltyRate = null;
    let penaltyType = null;
    let penaltyDuty = null;

    // Additional Info fields
    const shippingCost = parseFloat(document.querySelector("#shippingCostField").value);
    const shippingCostCurrency = document.querySelector("#shippingCurrencySelect").value;
    const insuranceCost = parseFloat(document.querySelector("#insuranceCostField").value);
    const insuranceCostCurrency = document.querySelector("#insuranceCurrencySelect").value;

    // Chapter 99 Fields
    const selectedResultCard = document.querySelector("#selectedResult");
    const ninetyNineJson = selectedResultCard.getAttribute('data-99-json');


    console.log('Parameters:', value, specialJSON, generalRate, quantity, isoCode, amount, amountUnit,currency);

    // Step 1: Calculate the general duty
    // Step 1.1: Calculate the duty for products where duty is calculated on value
    if (value !== null && isNaN(amount)) {
        duty = (value * generalRate * quantity).toFixed(2);
        console.log('Duty (value):', duty);
    }

    // Step 1.2: Calculate the duty for products where duty is calculated on amount
    if ((isNaN(value) || value == null) && !isNaN(amount) && amountUnit != null) {
        const amountQuantity = parseFloat(amount);
        duty = (generalRate * amountQuantity).toFixed(2);
        console.log('Duty (amount):', duty);
    }

    // Step 2: Calculate the special duty
    // Step 2.1: Get the special duty rate
    function getSpecialDutyRate(specialJSON, isoCode) {
        // Step 2.1.1: Check if specialJSON is null or undefined
        if (!specialJSON || !specialJSON.special_json) {
            console.log('specialJSON is null or undefined');
            return null;
        }

        // Step 2.1.2: Get the special duty rate
        let specialDutyRate = specialJSON.special_json[isoCode];
        console.log('Country Level Special Duty Rate:', specialDutyRate);

        // Step 2.2.3: If special duty rate is null or undefined, check if the country is A+, A* or USMCA
        if (specialDutyRate == null) {
            if (aStar[isoCode]) {
                specialDutyRate = specialJSON.special_json['A*'];
                console.log('A* Special Duty Rate:', specialDutyRate);
            } else if (aPlus[isoCode]) {
                specialDutyRate = specialJSON.special_json['A+'];
                console.log('A+ Special Duty Rate:', specialDutyRate);
            } else if (usmca[isoCode]) {
                specialDutyRate = specialJSON.special_json['S'];
                console.log('S Special Duty Rate:', specialDutyRate);
            } else {
                console.log('No Special Duty Rate Found');
                specialDutyRate = null;
            }
        }

        return specialDutyRate;
    }
    // Call the getSpecialDutyRate function
    const specialDutyRate = getSpecialDutyRate(specialJSON, isoCode);
    console.log('Special Duty Rate:', specialDutyRate);

    // Step 2.3: Calculate the special duty amount
    // Step 2.3.1: Calculate the special duty amount for products where duty is calculated on value
    if (value !== null && isNaN(amount) && specialDutyRate != null) {
        specialDuty = (value * specialDutyRate * quantity).toFixed(2);
        console.log('Special duty (value):', specialDuty);
    }

    // Step 2.3.2: Calculate the special duty amount for products where duty is calculated on amount
    if (amount !== null && amountUnit !== null && value === null && specialDutyRate != null) {
        const amountQuantity = parseFloat(amount);
        specialDuty = (value * specialDutyRate * quantity).toFixed(2);
        console.log('Special duty (amount):', specialDuty);
    }

    console.log('Special Duty:', specialDuty);

    // Step 3: Calculate Chapter 99 penalties
    // Step 3.1: Check if any Chapter 99 penalties apply and if so, get rate.
    function checkCountryMatch(isoCode, ninetyNineJson) {
        if (ninetyNineJson !== null && ninetyNineJson !== undefined && ninetyNineJson !== '') {
            const parsedJson = JSON.parse(ninetyNineJson);
            
            // Find the penalty object with matching country
            const matchedPenalty = parsedJson.find(penalty => penalty['99_countries'] === isoCode);
            
            if (matchedPenalty) {
                // Country match found
                console.log('Country match found:', matchedPenalty['99_countries']);
                ninetyNinePenaltyRate = matchedPenalty['99_rate'];
                penaltyType = matchedPenalty['99_type'];
                console.log('Country match found. 99 Penalty:', ninetyNinePenalty);
                // Perform additional actions here
            } else {
                // No country match found
                console.log('No country match found.');
            }
        }
    }

    // Call the checkCountryMatch function
    if (ninetyNineJson && ninetyNineJson !== null && ninetyNineJson !== undefined && ninetyNineJson !== '') {
        checkCountryMatch(isoCode, ninetyNineJson);
    }

    // Step 3.2: Calculate Penalty Amount
    function calculatePenaltyDuty(ninetyNinePenaltyRate, value, quantity) {
        penaltyDutyUnrounded = parseFloat(ninetyNinePenaltyRate) * parseFloat(value) * parseFloat(quantity);
        penaltyDuty = penaltyDutyUnrounded.toFixed(2);
        console.log('Penalty Duty:', penaltyDuty);
    }

    // Call the calculatePenaltyDuty function
    if (ninetyNinePenaltyRate && value && quantity) {
        calculatePenaltyDuty(ninetyNinePenaltyRate, value, quantity);
    }

    // Step 4: Calculate the total duty
    // Step 4.1: Calculate the Total Duty. Replace with Special Duty if Special Duty Exists
    let totalDuty = specialDuty !== null ? specialDuty : duty; // Total duty rounded to 2 decimal places
    console.log('Total Duty (excl tariffs):', totalDuty);

    // Step 4.2: Update Total Duty if Penalty Duty exists
    if (penaltyType === "in_lieu") {
        totalDuty = penaltyDuty.toFixed(2);
        console.log(`Total Duty (incl tariffs) for ${isoCode}:`, totalDuty);
    } else if (penaltyType === "additional") {
        totalDuty = (parseFloat(totalDuty) + parseFloat(penaltyDuty)).toFixed(2);
        console.log(`Total Duty (incl tariffs) for ${isoCode}:`, totalDuty);
    } else {
        console.log(`No penalty for ${isoCode}`);
    }

    // Function to reveal duty
    function updateTotalDuty(totalDuty, currency) {
        const totalDutyDiv = document.querySelector('#totalDuty');
        totalDutyDiv.textContent = totalDuty;

        const currencyDiv = document.querySelector('#dutyCurrency');
        currencyDiv.textContent = currency;
    }

    updateTotalDuty(totalDuty, currency);
    return totalDuty;
}

// Calculate duty button with count and login logic
document.addEventListener("DOMContentLoaded", async function() {
    // Get the button element
    const button = document.querySelector("#calculateDuty");

    // Attach the event listener to the button
    button.addEventListener("click", async function() {
        // Check if the button is clickable
        if (!button.classList.contains("unclickable") && button.getAttribute("data-disabled") !== "true") {
            // Check if daily_count is greater than 0 in local storage
            const dailyCount = localStorage.getItem("daily_count");

            // Check if member.data exists
            const member = await window.$memberstackDom.getCurrentMember();
            if (member.data) {
                // Get the input values
                const selectedResultCard = document.querySelector("#selectedResult");
                const value = parseFloat(document.querySelector("#valueField").value);

                // Retrieve the 'data-special-json' attribute
                const specialJSONAttr = selectedResultCard.getAttribute('data-special-json');
                // Check if it is a valid JSON string
                let specialJSON = null;
                if (specialJSONAttr && specialJSONAttr !== "undefined") {
                    try {
                        specialJSON = JSON.parse(specialJSONAttr);
                    } catch (e) {
                        console.error("Error parsing JSON from data-special-json:", e);
                    }
                }

                // Handle the general rate attribute
                const generalRateString = selectedResultCard.getAttribute('data-general');
                const generalRate = generalRateString === 'Free' ? 0 : (generalRateString ? parseFloat(generalRateString) / 100 : '');

                // Other input values
                const quantity = parseFloat(document.querySelector("#quantityField").value);
                const isoCode = document.querySelector("#importingFrom").value;
                const amount = parseFloat(document.querySelector("#amountField").value);
                const amountUnit = document.querySelector("#amountUnitSelect").value;
                const currency = document.querySelector("#currencySelect").value;

                console.log('Value:', value, 'Quantity:', quantity, 'ISO Code:', isoCode, 'General Rate:', generalRate, 'Special JSON:', specialJSON, 'Amount:', amount, 'Amount Unit:', amountUnit);

                // Call the calculateDuty function with the input values
                calculateDuty(value, specialJSON, generalRate, quantity, isoCode, amount, amountUnit, currency);
                addLoadingClass();

                // Call the subtractFromDailyCount function
                subtractFromDailyCount();
            } else if (dailyCount && parseInt(dailyCount) > 0) {
                // Get the input values
                const selectedResultCard = document.querySelector("#selectedResult");
                const value = parseFloat(document.querySelector("#valueField").value);

                // Retrieve the 'data-special-json' attribute
                const specialJSONAttr = selectedResultCard.getAttribute('data-special-json');
                // Check if it is a valid JSON string
                let specialJSON = null;
                if (specialJSONAttr && specialJSONAttr !== "undefined") {
                    try {
                        specialJSON = JSON.parse(specialJSONAttr);
                    } catch (e) {
                        console.error("Error parsing JSON from data-special-json:", e);
                    }
                }

                // Handle the general rate attribute
                const generalRateString = selectedResultCard.getAttribute('data-general');
                const generalRate = generalRateString === 'Free' ? 0 : (generalRateString ? parseFloat(generalRateString) / 100 : '');

                // Other input values
                const quantity = parseFloat(document.querySelector("#quantityField").value);
                const isoCode = document.querySelector("#importingFrom").value;
                const amount = parseFloat(document.querySelector("#amountField").value);
                const amountUnit = document.querySelector("#amountUnitSelect").value;
                const currency = document.querySelector("#currencySelect").value;

                console.log('Value:', value, 'Quantity:', quantity, 'ISO Code:', isoCode, 'General Rate:', generalRate, 'Special JSON:', specialJSON, 'Amount:', amount, 'Amount Unit:', amountUnit);

                // Call the calculateDuty function with the input values
                calculateDuty(value, specialJSON, generalRate, quantity, isoCode, amount, amountUnit, currency);
                addLoadingClass();

                // Call the subtractFromDailyCount function
                subtractFromDailyCount();
            } else {
                toggleUnlimitedModal();
                console.log("Daily count is not greater than 0. Cannot proceed.");
            }
        }
    });
});

const aStar = {
    'AF': true, 'AL': true, 'AM': true, 'AO': true, 'AR': true, 'AZ': true, 'BA': true, 'BF': true, 'BI': true, 'BJ': true, 'BO': true, 'BR': true, 'BT': true, 'BW': true, 'BZ': true, 'CD': true, 'CF': true, 'CG': true, 'CI': true, 'CM': true, 'CV': true, 'DJ': true, 'DM': true, 'DZ': true, 'EC': true, 'EG': true, 'ER': true, 'ET': true, 'FJ': true, 'GA': true, 'GD': true, 'GE': true, 'GH': true, 'GM': true, 'GN': true, 'GW': true, 'GY': true, 'HT': true, 'ID': true, 'IQ': true, 'JM': true, 'JO': true, 'KE': true, 'KG': true, 'KH': true, 'KI': true, 'KM': true, 'KV': true, 'KZ': true, 'LB': true, 'LC': true, 'LK': true, 'LR': true, 'LS': true, 'MD': true, 'ME': true, 'MG': true, 'MK': true, 'ML': true, 'MN': true, 'MR': true, 'MU': true, 'MV': true, 'MW': true, 'MZ': true, 'NA': true, 'NE': true, 'NG': true, 'NP': true, 'PG': true, 'PH': true, 'PK': true, 'PY': true, 'RS': true, 'RW': true, 'SB': true, 'SL': true, 'SN': true, 'SO': true, 'SR': true, 'SS': true, 'ST': true, 'TD': true, 'TG': true, 'TH': true, 'TL': true, 'TN': true, 'TO': true, 'TV': true, 'TZ': true, 'UA': true, 'UG': true, 'UZ': true, 'VC': true, 'VU': true, 'WS': true, 'YE': true, 'ZA': true, 'ZM': true, 'ZW': true
};

const aPlus = {
    'AF': true, 'AO': true, 'BF': true, 'BI': true, 'BJ': true, 'BT': true, 'BU': true, 'CD': true, 'CF': true, 'DJ': true, 'ET': true, 'GM': true, 'GN': true, 'GW': true, 'HT': true, 'KH': true, 'KI': true, 'KM': true, 'LR': true, 'LS': true, 'MG': true, 'ML': true, 'MR': true, 'MW': true, 'MZ': true, 'NE': true, 'NP': true, 'RW': true, 'SB': true, 'SL': true, 'SN': true, 'SO': true, 'SS': true, 'ST': true, 'TD': true, 'TG': true, 'TL': true, 'TV': true, 'TZ': true, 'UG': true, 'VU': true, 'WS': true, 'YE': true, 'ZM': true
};

const usmca = {
    'CA': true, 'MX': true
};

// Function to animate the loading field
function addLoadingClass() {
    const calculatorSteps = [
        document.querySelector("#calculatorStep1"),
        document.querySelector("#calculatorStep2"),
        document.querySelector("#calculatorStep3"),
        document.querySelector("#calculatorStep4"),
        document.querySelector("#calculatorStep5")
    ];

    const removeLoadingClassesFromElementAndDescendants = (element) => {
        element.classList.remove("loading");
        element.classList.remove("loaded");
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            removeLoadingClassesFromElementAndDescendants(children[i]);
        }
    };

    const addLoadingClassToElementAndDescendants = (element) => {
        element.classList.add("loading");
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            addLoadingClassToElementAndDescendants(children[i]);
        }
    };

    let i = 0;
    const addLoadingClassToNextStep = () => {
        if (i < calculatorSteps.length) {
            const currentStep = calculatorSteps[i];
            removeLoadingClassesFromElementAndDescendants(currentStep);
            addLoadingClassToElementAndDescendants(currentStep);
            const duration = Math.floor(Math.random() * 1000) + 2000; // Generate a random number between 2000-3000
            setTimeout(() => {
                currentStep.classList.remove("loading");
                currentStep.classList.add("loaded");
                const descendants = currentStep.querySelectorAll("*");
                for (let j = 0; j < descendants.length; j++) {
                    descendants[j].classList.remove("loading");
                    descendants[j].classList.add("loaded");
                }
                i++;
                if (i === calculatorSteps.length) {
                    // Reveal the duty rate wrapper
                    const dutyRateWrapper = document.querySelector('#dutyRateWrapper');
                    dutyRateWrapper.classList.remove('hidden');
                    setButtonState('nextStep2', 'enable');
                } else {
                    addLoadingClassToNextStep();
                }
            }, duration);
        }
    };

    addLoadingClassToNextStep();
}

// Add event listener to Additioanal Info button
document.addEventListener("DOMContentLoaded", () => {
    const expandAdditionalInfoBtn = document.querySelector("#expandAdditionalInfo");
    const additionalFields = document.querySelector("#additionalFields");
    console.log(expandAdditionalInfoBtn, additionalFields);

    expandAdditionalInfoBtn.addEventListener("click", () => {
        console.log("Additional Info Click");
        additionalFields.classList.toggle("hidden");
        console.log("Class Hidden applied to additionalFields");

        // Get all children of additionalFields
        const childElements = additionalFields.querySelectorAll("*");
        // Loop through each child element and toggle the hidden class
        childElements.forEach(childElement => {
            childElement.classList.toggle("hidden");
        });
    });
});

// Handle radio button behaviour
document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('.radiowrapper .w-form-formradioinput');

    // Set the default selected radio button
    radioButtons.forEach(radio => {
        if (radio.getAttribute('data-default-select') === 'true') {
            radio.checked = true;
        }

        // Add click event listener to each radio button
        radio.addEventListener('click', (event) => {
            // Uncheck all other radio buttons
            radioButtons.forEach(rb => rb.checked = false);
            
            // Check the clicked radio button
            event.target.checked = true;
        });
    });
});

// Watch the calculation fields for changes to enable the calculate duty button
function watchFieldsForCalculation() {
    console.log('Started watching calculation fields...');
    const selectedResult = document.getElementById('selectedResult');
    const calculationType = selectedResult.getAttribute('data-calculation-type');
    const importingFrom = document.getElementById('importingFrom').value;

    // Common function to check fields
    const checkFields = (fields) => {
        const allFilled = fields.every(field => field.value.trim() !== '');
        setButtonState('calculateDuty', allFilled ? 'enable' : 'disable');
        console.log(`Required fields are ${allFilled ? 'filled' : 'not filled'}. Calculate button ${allFilled ? 'enabled' : 'disabled'}.`);
    };

    if (calculationType === 'value') {
        const fields = [
            document.getElementById('importingTo'),
            document.getElementById('importingFrom'),
            document.getElementById('valueField'),
            document.getElementById('currencySelect'),
            document.getElementById('quantityField')
        ];

        console.log('Calculation type is value. Found fields: importingTo, importingFrom, valueField, currencySelect, quantityField');

        // Initial check for pre-populated fields
        checkFields(fields);

        fields.forEach(field => field.addEventListener('input', () => checkFields(fields)));
        fields.forEach(field => field.addEventListener('change', () => checkFields(fields)));
    } else if (calculationType === 'amount' && importingFrom !== 'CN') {
        const fields = [
            document.getElementById('importingTo'),
            document.getElementById('importingFrom'),
            document.getElementById('amountField'),
            document.getElementById('amountUnitSelect')
        ];

        console.log('Calculation type is amount and importingFrom is not China. Found fields: importingTo, importingFrom, amountField, amountUnitSelect');

        // Initial check for pre-populated fields
        checkFields(fields);

        fields.forEach(field => field.addEventListener('input', () => checkFields(fields)));
        fields.forEach(field => field.addEventListener('change', () => checkFields(fields)));
    } else if (calculationType === 'amount' && importingFrom === 'CN') {
        const fields = [
            document.getElementById('importingTo'),
            document.getElementById('importingFrom'),
            document.getElementById('amountField'),
            document.getElementById('amountUnitSelect'),
            document.getElementById('valueField'),
            document.getElementById('quantityField')
        ];

        console.log('Calculation type is amount and importingFrom is China. Found fields: importingTo, importingFrom, amountField, amountUnitSelect, valueField, quantityField');

        // Initial check for pre-populated fields
        checkFields(fields);

        fields.forEach(field => field.addEventListener('input', () => checkFields(fields)));
        fields.forEach(field => field.addEventListener('change', () => checkFields(fields)));
    }
}

// Find the standard radio buttons add event listeners to them
document.addEventListener('DOMContentLoaded', () => {
    // Get all radio buttons with class "standard-radio-button"
    const radioButtons = document.querySelectorAll('.standard-radio-button');

    // Add event listener to each radio button
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('click', () => {
            // Uncheck all other radio buttons
            radioButtons.forEach(otherRadioButton => {
                if (otherRadioButton !== radioButton) {
                    otherRadioButton.checked = false;
                }
            });
            // Check the clicked radio button
            radioButton.checked = true;

            // Call setButtonState if valueTotalRadio is checked
            if (radioButton.id === 'valueTotalRadio' && radioButton.checked) {
                setButtonState('quantityField', 'disable');
                setQuantityFieldToOne();
            } else if (radioButton.id === 'valueUnitRadio' && radioButton.checked) {
                setButtonState('quantityField', 'enable');
            }
        });
        // Pre-check the radio button with ID = valueTotalRadio
        if (radioButton.id === 'valueTotalRadio') {
            radioButton.checked = true;
        }
    });
});

// Function to toggle the signup modal
function toggleUnlimitedModal() {
    const unlimitedModal = document.getElementById('unlimitedModal');
    unlimitedModal.classList.toggle('hidden');
}

// Add event listener to closeUnlimitedModal element
document.addEventListener('DOMContentLoaded', () => {
    const closeUnlimitedModal = document.getElementById('closeUnlimitedModal');
    closeUnlimitedModal.addEventListener('click', toggleUnlimitedModal);
});

// Function to togle the display of the China value fields
function updateDisplay() {
    const importingFromField = document.getElementById("importingFrom");
    const chinaValueWrapper = document.getElementById("valueWrapper");
    const selectedResult = document.getElementById("selectedResult");

    if (selectedResult.getAttribute("data-calculation-type") === "amount") {
        if (importingFromField.value === "CN") {
            chinaValueWrapper.classList.remove("hidden");
        } else {
            chinaValueWrapper.classList.add("hidden");
        }
    } else {
        console.log("Calculation type is not amount. Not toggling the display of the China value fields.");
    }
}

// Add event listener to importingFrom field to toggle the display of the China value fields
const importingFromField = document.getElementById("importingFrom");

importingFromField.addEventListener("change", function() {
    updateDisplay();
});

