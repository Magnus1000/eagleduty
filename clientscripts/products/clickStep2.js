// Call functions on page load
window.addEventListener("load", () => {
    // Add event listener to the radio buttons which wrap the results
    addRadioEventListener();

    // Add event listener to the see details buttons
    addEventListenersToSeeDetailsButton();

    const nextStep1Button = document.querySelector("#nextStep2");
    nextStep1Button.addEventListener("click", function() {
        if (!nextStep1Button.classList.contains("unclickable") && nextStep1Button.getAttribute("data-disabled") !== "true") {
            goStep2();
            watchFieldsForCalculation();
        }
    });

    // Event listener for the back button
    const backStep1Button = document.querySelector("#backStep1");
    backStep1Button.addEventListener("click", backStep1);
    
    setButtonState('nextStep1', 'disable');
    setButtonState('nextStep2', 'disable');
    setButtonState('calculateDuty', 'disable');
    createDropdownOptions();
    getUserLocation();
    setButtonState('quantityField', 'disable');
    setQuantityFieldToOne();
});