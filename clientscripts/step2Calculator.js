// Main Function to calculate the duty
function calculateDuty(productValue, specialJSON, generalRate, quantity, isoCode) {
    // Step 1: Calculate the duty
    const duty = productValue * generalRate * quantity;
    console.log('Duty:', duty);

    // Step 2: Calculate the special duty
    function getSpecialDutyRate(specialJSON, isoCode) {
        // Step 2.1: Get the special duty rate
        let specialDutyRate = specialJSON.special_json[isoCode];
        console.log('Special Duty Rate:', specialDutyRate);
        // Step 2.2: If special duty rate is null, check if the country is A+, A* or USMCA
        if (specialDutyRate === null) {
            if (aStar[isoCode]) {
                specialDutyRate = specialJSON.special_json['A*'];
            } else if (aPlus[isoCode]) {
                specialDutyRate = specialJSON.special_json['A+'];
            } else if (usmca[isoCode]) {
                specialDutyRate = specialJSON.special_json['S'];
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
    });
});

const aStar = {
    ["AF", "AL", "AM", "AO", "AR", "AZ", "BA", "BF", "BI", "BJ", "BO", "BR", "BT", "BW", "BZ", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DM", "DZ", "EC", "EG", "ER", "ET", "FJ", "GA", "GD", "GE", "GH", "GM", "GN", "GW", "GY", "HT", "ID", "IQ", "JM", "JO", "KE", "KG", "KH", "KI", "KM", "KV", "KZ", "LB", "LC", "LK", "LR", "LS", "MD", "ME", "MG", "MK", "ML", "MN", "MR", "MU", "MV", "MW", "MZ", "NA", "NE", "NG", "NP", "PG", "PH", "PK", "PY", "RS", "RW", "SB", "SL", "SN", "SO", "SR", "SS", "ST", "TD", "TG", "TH", "TL", "TN", "TO", "TV", "TZ", "UA", "UG", "UZ", "VC", "VU", "WS", "YE", "ZA", "ZM", "ZW"]
};

const aPlus = {
    ["AF", "AO", "BF", "BI", "BJ", "BT", "BU", "CD", "CF", "DJ", "ET", "GM", "GN", "GW", "HT", "KH", "KI", "KM", "LR", "LS", "MG", "ML", "MR", "MW", "MZ", "NE", "NP", "RW", "SB", "SL", "SN", "SO", "SS", "ST", "TD", "TG", "TL", "TV", "TZ", "UG", "VU", "WS", "YE", "ZM"]
};

const usmca = {
    ["CA", "MX"]
};