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
    const shippingCostField = document.querySelector("#shippingCostField");
    const shippingCost = shippingCostField.value ? parseFloat(shippingCostField.value) : 0;
    const shippingCostCurrency = document.querySelector("#shippingCurrencySelect").value;
    const insuranceCostField = document.querySelector("#insuranceCostField");
    const insuranceCost = insuranceCostField.value ? parseFloat(insuranceCostField.value) : 0;
    const insuranceCostCurrency = document.querySelector("#insuranceCurrencySelect").value;

    // Calculate the value inclusive of shipping cost and insurance cost
    const inclusiveValue = value + shippingCost + insuranceCost;

    // Subtext
    let specialDutySubtextText = null;
    let penaltyDutySubtextText = null;
    let generalDutySubtextText = null;

    // Chapter 99 Fields
    const selectedResultCard = document.querySelector("#selectedResult");
    const ninetyNineJson = selectedResultCard.getAttribute('data-99-json');

    //Calculation Type
    const calculationType = selectedResultCard.getAttribute('data-calculation-type');

    //General rate text
    const generalRateString = selectedResultCard.getAttribute('data-general');

    // Country name
    const countryName = document.querySelector("#importingFrom").options[document.querySelector("#importingFrom").selectedIndex].text;

    // Trade Agreement Details
    const tradeAgreements = {
        "AU": {"country": "Australia", "trade_agreement": "United States-Australia Free Trade Agreement (AUSFTA)"},
        "BH": {"country": "Bahrain", "trade_agreement": "United States-Bahrain Free Trade Agreement (USBFTA)"},
        "CA": {"country": "Canada", "trade_agreement": "United States-Mexico-Canada Agreement (USMCA), previously known as the North American Free Trade Agreement (NAFTA)"},
        "CL": {"country": "Chile", "trade_agreement": "United States-Chile Free Trade Agreement (USCFTA)"},
        "CO": {"country": "Colombia", "trade_agreement": "United States-Colombia Trade Promotion Agreement (CTPA)"},
        "CR": {"country": "Costa Rica", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR), which also includes other Central American countries"},
        "DO": {"country": "Dominican Republic", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"},
        "SV": {"country": "El Salvador", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"},
        "GT": {"country": "Guatemala", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"},
        "HN": {"country": "Honduras", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"},
        "IL": {"country": "Israel", "trade_agreement": "United States-Israel Free Trade Agreement (USIFTA)"},
        "JO": {"country": "Jordan", "trade_agreement": "United States-Jordan Free Trade Agreement (USJFTA)"},
        "KR": {"country": "Korea, Republic of", "trade_agreement": "United States-Korea Free Trade Agreement (KORUS FTA)"},
        "MX": {"country": "Mexico", "trade_agreement": "United States-Mexico-Canada Agreement (USMCA)"},
        "MA": {"country": "Morocco", "trade_agreement": "United States-Morocco Free Trade Agreement (USMFTA)"},
        "NI": {"country": "Nicaragua", "trade_agreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"},
        "OM": {"country": "Oman", "trade_agreement": "United States-Oman Free Trade Agreement (USOFTA)"},
        "PA": {"country": "Panama", "trade_agreement": "United States-Panama Trade Promotion Agreement (PATPA)"},
        "PE": {"country": "Peru", "trade_agreement": "United States-Peru Trade Promotion Agreement (PTPA)"},
        "SG": {"country": "Singapore", "trade_agreement": "United States-Singapore Free Trade Agreement (USSFTA)"}
    }


    console.log('Parameters:', value, specialJSON, generalRate, quantity, isoCode, amount, amountUnit,currency);

    // Step 1: Calculate the general duty
    // Step 1.1: Calculate the duty for products where duty is calculated on value
    if (calculationType === "value") {
            duty = (inclusiveValue * generalRate * quantity).toFixed(2);
            console.log('Duty (value):', duty);
            if (generalRateString === 'Free') {
                generalDutySubtextText = `This item is duty free.`;
            } 
            else {
                generalDutySubtextText = `This item is subject to a ${generalRateString} duty on the value of ${inclusiveValue} ${currency} (including shipping and insurance costs).`;
            }
    // Step 1.2: Calculate the duty for products where duty is calculated on amount
    } else if (calculationType === "amount") {
            const amountQuantity = parseFloat(amount);
            duty = (generalRate * amountQuantity).toFixed(2); 
            console.log('Duty (amount):', duty);
            if (generalRateString === 'Free') {
                generalDutySubtextText = `This item is duty free.`;
            }
            else {
            generalDutySubtextText = `This item is subject to a ${generalRateString} duty on the amount of ${amount} ${amountUnit}.`;
            }
    } else {
        console.log('No calculation type found');
        generalDutySubtextText = `Something went wrong calculating the general duty. Please try again.`;
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

        if (specialDutyRate !== null) {
            const amountSaved = (((parseFloat(generalRate) - parseFloat(specialDutyRate)) * 100)/ parseFloat(generalRate)).toFixed(2);

            if (tradeAgreements && tradeAgreements[isoCode] && tradeAgreements[isoCode].trade_agreement) {
                const freeTradeAgreement = tradeAgreements[isoCode].trade_agreement;
                specialDutySubtextText = `This item enjoys a special duty rate of ${specialDutyRate} as part of the ${freeTradeAgreement}, saving ${amountSaved}% on duty.`;
            } else {
                specialDutySubtextText = 'No special duty rate available for this item.';
            }
        }

        // Step 2.2.3: If special duty rate is null or undefined, check if the country is A+, A* or USMCA
        if (specialDutyRate == null) {
            if (aStar[isoCode]) {
                specialDutyRate = specialJSON.special_json['A*'];
                const amountSaved = (parseFloat (duty) - parseFloat(specialDuty)).toFixed(2);
                console.log('A* Special Duty Rate:', specialDutyRate);
                specialDutySubtextText = `This item enjoys as special duty rate as ${countryName} is part of the Beneficiary Developing Countries (BDCs). You save ${amountSaved}% on duty.`;
            } else if (aPlus[isoCode]) {
                specialDutyRate = specialJSON.special_json['A+'];
                console.log('A+ Special Duty Rate:', specialDutyRate);
                const amountSaved = (parseFloat (duty) - parseFloat(specialDuty)).toFixed(2);
                specialDutySubtextText = `This item enjoys as special duty rate as ${countryName} is one of the Least-developed beneficiary countries. You save ${amountSaved}% on duty.`;
            } else if (usmca[isoCode]) {
                specialDutyRate = specialJSON.special_json['S'];
                console.log('S Special Duty Rate:', specialDutyRate);
                const amountSaved = (parseFloat (duty) - parseFloat(specialDuty)).toFixed(2);
                specialDutySubtextText = `This item enjoys as special duty rate due to the United States-Mexico-Canada Agreement (USMCA). You save ${amountSaved}% on duty.`;
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
        specialDuty = (inclusiveValue * specialDutyRate * quantity).toFixed(2);
        console.log('Special duty (value):', specialDuty);
    }

    // Step 2.3.2: Calculate the special duty amount for products where duty is calculated on amount
    if (amount !== null && amountUnit !== null && value === null && specialDutyRate != null) {
        const amountQuantity = parseFloat(amount);
        specialDuty = (inclusiveValue * specialDutyRate * quantity).toFixed(2);
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
                console.log('Country match found. 99 Penalty:', ninetyNinePenaltyRate);
                if (penaltyType === "in_lieu") {
                    penaltyDutySubtextText = `This item is subject to trade penalties or tariffs when imported from ${countryName}. The penalized duty rate for this item is ${ninetyNinePenaltyRate} instead of the general duty rate.`;
                } else if (penaltyType === "additional") {
                    penaltyDutySubtextText = `This item is subject to trade penalties or tariffs when imported from ${countryName}. This item is subject to an additional ${ninetyNinePenaltyRate} penalty duty on top of the general duty.`;
                }
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
    function calculatePenaltyDuty(ninetyNinePenaltyRate, inclusiveValue, quantity) {
        penaltyDutyUnrounded = parseFloat(ninetyNinePenaltyRate) * parseFloat(inclusiveValue) * parseFloat(quantity) / 100;
        penaltyDuty = penaltyDutyUnrounded.toFixed(2);
        console.log('Penalty Duty:', penaltyDuty);
    }

    // Call the calculatePenaltyDuty function
    if (ninetyNinePenaltyRate && value && quantity) {
        calculatePenaltyDuty(ninetyNinePenaltyRate, inclusiveValue, quantity);
    }

    // Step 4: Calculate the total duty
    // Step 4.1: Calculate the Total Duty. Replace with Special Duty if Special Duty Exists
    let totalDuty = specialDuty !== null ? specialDuty : duty; // Total duty rounded to 2 decimal places
    console.log('Total Duty (excl tariffs):', totalDuty);

    // Step 4.2: Update Total Duty if Penalty Duty exists
    if (penaltyType === "in_lieu") {
        totalDuty = penaltyDuty;
        console.log(`Total Duty (incl tariffs) for ${isoCode}:`, totalDuty);
    } else if (penaltyType === "additional") {
        totalDuty = (parseFloat(totalDuty) + parseFloat(penaltyDuty)).toFixed(2);
        console.log(`Total Duty (incl tariffs) for ${isoCode}:`, totalDuty);
    } else {
        console.log(`No penalty for ${isoCode}`);
    }

    // Function to reveal duty
    function updateTotalDuty(totalDuty, currency) {
        // Populate the costs fields
        const htsnoDiv = document.querySelector('#resultHTSCode');
        const selectedResultCard = document.querySelector("#selectedResult");
        htsnoDiv.textContent = selectedResultCard.getAttribute('data-htsno');

        const htsnoCost = document.querySelector('#resultHTSValue');
        htsnoCost.textContent = (parseFloat(value) * parseFloat(quantity)).toFixed(2);

        const quantityDiv = document.querySelector('#resultQuantity');
        quantityDiv.textContent = quantity;

        const shippingCostDiv = document.querySelector('#resultShippingCost');
        shippingCostDiv.textContent = shippingCost;

        const insuranceCostDiv = document.querySelector('#resultInsuranceCost');
        insuranceCostDiv.textContent = insuranceCost;

        // Show / Hide the divs
        // If duty exists and special duty doesn't, show general
        if (duty !== null && specialDuty === null) {
            const dutyDiv = document.querySelector('#generalDutyRow');
            dutyDiv.classList.remove('hidden');
            const specialDutyDiv = document.querySelector('#specialDutyRow');
            specialDutyDiv.classList.add('hidden');
            console.log('Duty exists and Special Duty does not. Showing General Duty.');
        }

        // If special duty exists, hide general
        if (specialDuty !== null) {
            const specialDutyDiv = document.querySelector('#specialDutyRow');
            specialDutyDiv.classList.remove('hidden');
            const penaltyDutyDiv = document.querySelector('#penaltyDutyRow');
            penaltyDutyDiv.classList.add('hidden');
            const dutyDiv = document.querySelector('#generalDutyRow');
            dutyDiv.classList.add('hidden');
            console.log('Special Duty exists. Hiding General Duty.');
        }

        // If penalty duty exists, and type is "in-lieu", show penalty and hide general
        if (penaltyDuty !== null && penaltyType === 'in-lieu') {
            const penaltyDutyDiv = document.querySelector('#penaltyDutyRow');
            penaltyDutyDiv.classList.remove('hidden');
            const dutyDiv = document.querySelector('#generalDutyRow');
            dutyDiv.classList.add('hidden');
            const specialDutyDiv = document.querySelector('#specialDutyRow');
            specialDutyDiv.classList.add('hidden');
            console.log('Penalty Duty exists and type is In-Lieu. Hiding General Duty.');
        }

        // If penalty duty exists, and type is "addition", show penalty and general
        if (penaltyDuty !== null && penaltyType === 'additional') {
            const penaltyDutyDiv = document.querySelector('#penaltyDutyRow');
            const specialDutyDiv = document.querySelector('#specialDutyRow');
            specialDutyDiv.classList.add('hidden');
            penaltyDutyDiv.classList.remove('hidden');
            const dutyDiv = document.querySelector('#generalDutyRow');
            dutyDiv.classList.remove('hidden');
            console.log('Penalty Duty exists and type is Addition. Showing General Duty.');
        }


        // Populate the results fields
        const totalDutyDiv = document.querySelector('#totalDuty');
        totalDutyDiv.textContent = totalDuty;

        const currencyDivs = document.querySelectorAll('.duty-currency');
        currencyDivs.forEach((currencyDiv) => {
            currencyDiv.textContent = currency;
        });

        const generalDutyDiv = document.querySelector('#resultGeneralDuty');
        generalDutyDiv.textContent = duty;

        const specialRateDiv = document.querySelector('#resultSpecialDuty');
        specialRateDiv.textContent = specialDuty;

        const penaltyRateDiv = document.querySelector('#resultPenaltyDuty');
        penaltyRateDiv.textContent = penaltyDuty;

        // Populate the subtext
        const specialDutySubtext = document.querySelector('#resultSpecialDutySubtext');
        specialDutySubtext.textContent = specialDutySubtextText;

        const penatyDutySubtext = document.querySelector('#resultPenaltyDutySubtext');
        penatyDutySubtext.textContent = penaltyDutySubtextText;

        const generalDutySubtext = document.querySelector('#resultGeneralDutySubtext');
        generalDutySubtext.textContent = generalDutySubtextText;

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

            // Call the addToCount function
            addToCount();
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
    // Show loading div
    const loadingDiv = document.querySelector('#loadingDiv');
    loadingDiv.classList.remove("hidden");

    //Hide results div
    const dutyRateWrapper = document.querySelector('#dutyRateWrapper');
    dutyRateWrapper.classList.add('hidden');

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
                    // Hide the loading message
                    const loadingDiv = document.querySelector('#loadingDiv');
                    loadingDiv.classList.add("hidden");
                    // Set state of Next button
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
    const selectedResultCard = document.querySelector("#selectedResult");
    const ninetyNineJson = JSON.parse(selectedResultCard.getAttribute('data-99-json'));

    console.log('ninetyNineJson:', ninetyNineJson);
    console.log('ninetyNineJsonLength:', ninetyNineJson.length);
    console.log('isArray:', Array.isArray(ninetyNineJson));

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
    } else if (calculationType === 'amount' && importingFrom && (!ninetyNineJson || ninetyNineJson.length === 0)) {
        const fields = [
            document.getElementById('importingTo'),
            document.getElementById('importingFrom'),
            document.getElementById('amountField'),
            document.getElementById('amountUnitSelect')
        ];

        console.log('Calculation type is amount and importingFrom country DOES NOT have an addition tariff. Found fields: importingTo, importingFrom, amountField, amountUnitSelect');
        console.log('ninetyNineJsonLength:', ninetyNineJson.length);

        // Initial check for pre-populated fields
        checkFields(fields);

        fields.forEach(field => field.addEventListener('input', () => checkFields(fields)));
        fields.forEach(field => field.addEventListener('change', () => checkFields(fields)));
    } else if (calculationType === 'amount' && Array.isArray(ninetyNineJson) && ninetyNineJson.length > 0) {
        const fields = [
            document.getElementById('importingTo'),
            document.getElementById('importingFrom'),
            document.getElementById('amountField'),
            document.getElementById('amountUnitSelect'),
            document.getElementById('valueField'),
            document.getElementById('quantityField')
        ];

        console.log('Calculation type is amount and importingFrom country DOES have an addition tariff.. Found fields: importingTo, importingFrom, amountField, amountUnitSelect, valueField, quantityField');

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

// Function to toggle the display of the China value fields
function updateDisplay() {
    const importingFromField = document.getElementById("importingFrom");
    const chinaValueWrapper = document.getElementById("valueWrapper");
    const selectedResultCard = document.getElementById("selectedResult");

    const ninetyNineJson = JSON.parse(selectedResultCard.getAttribute('data-99-json'));

    if (Array.isArray(ninetyNineJson) && ninetyNineJson.length > 0) {
        const ninetyNineCountries = ninetyNineJson.map(item => item["99_countries"]);

        if (selectedResultCard.getAttribute("data-calculation-type") === "amount") {
            if (ninetyNineCountries.includes(importingFromField.value)) {
                chinaValueWrapper.classList.remove("hidden");
            } else {
                chinaValueWrapper.classList.add("hidden");
            }
        } else {
            console.log("Calculation type is not amount. Not toggling the display of the China value fields.");
        }
    } else {
        console.log("Invalid 99_json. Not toggling the display of the China value fields.");
    }
}

// Add event listener to importingFrom field to toggle the display of the China value fields
const importingFromField = document.getElementById("importingFrom");

importingFromField.addEventListener("change", function() {
    updateDisplay();
});

