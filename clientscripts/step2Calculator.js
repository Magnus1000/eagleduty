// Function to calculate the duty and tariffs
function calculateDutyAndTariffs() {
    const selectedResultCard = document.querySelector("#selectedResult");
    const htsno = selectedResultCard.getAttribute('data-htsno');
    const general = selectedResultCard.getAttribute('data-general');
    const additionalFees = parseFloat(selectedResultCard.getAttribute('data-other') || 0);
    const unit = selectedResultCard.getAttribute('data-units');
    const productValue = parseFloat(document.querySelector("#productValue").value);
    const quantity = parseFloat(document.querySelector("#quantity").value);
    const countryOfOrigin = document.querySelector("#importingFrom").value;

    let duty;
    if (general.includes('/')) { // Specific duty calculation
        const ratePerUnit = parseFloat(general.split('/')[0].replace('$', ''));
        duty = quantity * ratePerUnit;
    } else { // Ad valorem duty calculation
        const dutyRate = parseFloat(general); // Assuming 'general' is a percentage for ad valorem
        duty = productValue * dutyRate;
    }

    const totalCost = productValue + duty + additionalFees;

    // Logging for demonstration
    console.log(`HTS Number: ${htsno}, Product Value: $${productValue}, Country of Origin: ${countryOfOrigin}, Duty: $${duty}, Total Cost: $${totalCost}`);

    document.querySelector("#dutyTotal").innerHTML = `Total Duty: $${duty}`;
}

document.querySelector("#calculateDuty").addEventListener("click", calculateDutyAndTariffs);