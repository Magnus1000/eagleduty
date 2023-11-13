// Function to calculate duty and tariffs
function calculateDutyAndTariffs() {
    const selectedResultCard = document.querySelector("#selectedResult");
    const htsno = selectedResultCard.getAttribute('data-htsno');
    const general = selectedResultCard.getAttribute('data-general');
    const specialJSON = selectedResultCard.getAttribute('data-special-json');
    const additionalFees = parseFloat(selectedResultCard.getAttribute('data-other') || 0);
    const unit = selectedResultCard.getAttribute('data-units');
    const productValue = parseFloat(document.querySelector("#productValue").value);
    const quantity = parseFloat(document.querySelector("#quantity").value);
    const isoCode = document.querySelector("#importingFrom").value;
    const countryOfOrigin = getSelectedText();

    // Function to parse the special JSON and return a map of country codes to duty rates
    function parseSpecialRates(special) {
        const rates = JSON.parse(special).rates;
        return rates;
    }

    // This function will fetch the text of the selected option
    // in the select element with the ID 'importingFrom'
    function getSelectedText() {
        // Get the select element by its ID
        var selectElement = document.getElementById('importingFrom');

        // Get the selected option element
        var selectedOption = selectElement.options[selectElement.selectedIndex];

        // Get the text of the selected option
        var selectedText = selectedOption.text;

        // Log the selected text to the console
        console.log('Selected Text:', selectedText);

        // Return the selected text
        return selectedText;
    }

    // Parsing the special JSON
    const specialRates = parseSpecialRates(specialJSON);

    // Determine the appropriate duty rate
    let dutyRate;
    if (specialRates[isoCode]) {
        // If the country code is found in the special rates
        dutyRate = specialRates[isoCode];
    } else {
        // Default to the general rate
        dutyRate = general;
    }

    let duty;
    if (isNaN(dutyRate)) { // Specific duty calculation
        const ratePerUnit = parseFloat(general.split('/')[0].replace('$', ''));
        duty = quantity * ratePerUnit;
    } else { // Ad valorem duty calculation
        duty = productValue * dutyRate;
    }

    const totalCost = productValue + duty + additionalFees;

    // Logging for demonstration
    console.log(`HTS Number: ${htsno}, Product Value: $${productValue}, Country of Origin: ${countryOfOrigin}, Duty: $${duty}, Total Cost: $${totalCost}, ISO Code: ${isoCode}, Special: ${specialJSON}`);

    document.querySelector("#dutyTotal").innerHTML = `Total Duty: $${duty}`;
}

document.querySelector("#calculateDuty").addEventListener("click", calculateDutyAndTariffs);