// Main Function to calculate the duty
function calculateDuty(productValue, specialJSON, generalRate, valueQuantity, isoCode) {
    // Step 1: Calculate the duty
    const duty = productValue * generalRate * valueQuantity;
    console.log('Duty:', duty);

    // Step 2: Calculate the special duty
    function getSpecialDutyRate(specialJSON, isoCode) {
        // Check if specialJSON is null or undefined
        if (!specialJSON || !specialJSON.special_json) {
            console.log('specialJSON is null or undefined');
            return null;
        }

        // Step 2.1: Get the special duty rate
        let specialDutyRate = specialJSON.special_json[isoCode];
        console.log('First Check Special Duty Rate:', specialDutyRate);

        // Step 2.2: If special duty rate is null or undefined, check if the country is A+, A* or USMCA
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
                console.log('Else Special Rate:', specialDutyRate);
                specialDutyRate = null;
            }
        }

        return specialDutyRate;
    }

    const specialDutyRate = getSpecialDutyRate(specialJSON, isoCode);

    // Step 2.3: Calculate the special duty
    const specialDuty = productValue * specialDutyRate * valueQuantity;
    console.log('Special Duty:', specialDuty);

    // Step 3: Calculate the total duty
    const totalDuty = specialDuty !== null ? specialDuty : duty;
    console.log('Total Duty:', totalDuty);

    return totalDuty;
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
        const specialJSON = JSON.parse(selectedResultCard.getAttribute('data-special-json'));
        const generalRate = selectedResultCard.getAttribute('data-general') ? parseFloat(selectedResultCard.getAttribute('data-general')) / 100 : '';
        const valueQuantity = parseFloat(document.querySelector("#valueQuantityInput").value);
        const isoCode = document.querySelector("#importingFrom").value;
        console.log('Product Value:',productValue,'Quantity:',valueQuantity,'ISO Code:',isoCode,'General Rate:',generalRate,'Special JSON:',specialJSON);
        
        // Call the calculateDuty function with the input values
        calculateDuty(productValue, specialJSON, generalRate, valueQuantity, isoCode);
        addLoadingClass();
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
        document.querySelector("#calculatorStep4")
    ];

    let i = 0;
    const addLoadingClassToNextStep = () => {
        if (i < calculatorSteps.length) {
            const currentStep = calculatorSteps[i];
            currentStep.classList.add("loading");
            setTimeout(() => {
                currentStep.classList.remove("loading");
                currentStep.classList.add("loaded");
                i++;
                addLoadingClassToNextStep();
            }, 3000);
        }
    };

    addLoadingClassToNextStep();
}

// Add event listener to Additioanl Info button
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
