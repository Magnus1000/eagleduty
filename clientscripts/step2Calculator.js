// Main Function to calculate the duty
function calculateDuty(productValue, specialJSON, generalRate, quantity, isoCode) {
    // Step 1: Calculate the duty
    const duty = productValue * generalRate * quantity;
    console.log('Duty:', duty);

    // Step 2: Calculate the special duty
    function getSpecialDutyRate(specialJSON, isoCode) {
        // Step 2.1: Get the special duty rate
        let specialDutyRate = specialJSON.special_json[isoCode];
        console.log('First Check Special Duty Rate:', specialDutyRate);
        // Step 2.2: If special duty rate is null or undefined, check if the country is A+, A* or USMCA
        if (specialDutyRate == null) {
            if (aStar[isoCode]) {
                specialDutyRate = specialJSON.special_json['A*'];
                console.log('A+ Special Duty Rate:', specialDutyRate);
            } else if (aPlus[isoCode]) {
                specialDutyRate = specialJSON.special_json['A+'];
                console.log('A* Special Duty Rate:', specialDutyRate);
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
    const specialDuty = productValue * specialDutyRate * quantity;
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
        const quantity = parseFloat(document.querySelector("#quantity").value);
        const isoCode = document.querySelector("#importingFrom").value;
        console.log('Product Value:',productValue,'Quantity:',quantity,'ISO Code:',isoCode,'General Rate:',generalRate,'Special JSON:',specialJSON);
        
        // Call the calculateDuty function with the input values
        calculateDuty(productValue, specialJSON, generalRate, quantity, isoCode);
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
    });
});


// Function to add the parent class to the children
document.addEventListener("DOMContentLoaded", () => {
    // Get all elements with data-inherit-class attribute
    const elementsWithInheritClass = document.querySelectorAll("[data-inherit-class]");

    // Loop through each element and add event listeners for class changes
    elementsWithInheritClass.forEach(element => {
        // If the element is a parent, add an event listener for class additions
        if (element.dataset.inheritClass === "parent") {
            element.addEventListener("classadd", () => {
                // Get all child elements with data-inherit-class attribute
                const childElements = element.querySelectorAll("[data-inherit-class='child']");
                // Loop through each child element and add the parent's class
                childElements.forEach(childElement => {
                    childElement.classList.add(...element.classList);
                });
            });
            // Add an event listener for class removals
            element.addEventListener("classremove", () => {
                // Get all child elements with data-inherit-class attribute
                const childElements = element.querySelectorAll("[data-inherit-class='child']");
                // Loop through each child element and remove the parent's class
                childElements.forEach(childElement => {
                    childElement.classList.remove(...element.classList);
                });
            });
        }
    });
});