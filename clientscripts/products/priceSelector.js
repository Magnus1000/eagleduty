document.addEventListener('DOMContentLoaded', function() {
    // Define the values to be assigned
    const orderValues = {
        '1': 'a27265b4b3a928e9950bb0c7d580a659',
        '2': '9fff0556c26eed38379dfe94e4b90aeb',
        '3': '023d5410f566bee8336708b46f235ae7'
    };

    // Function to set the select value based on the clicked div's data-custom-value attribute
    const setSelectValue = (value, clickedDiv) => {
        const select = document.querySelector('select[data-custom-buy-now="select"]');
        if (select) {
            select.value = value;
            // Trigger change event in case there are any listeners
            const event = new Event('change');
            select.dispatchEvent(event);
        }

        // Update the 'selected' class on the radio buttons
        const radioDivs = document.querySelectorAll('div[data-custom-buy-now="radio"]');
        radioDivs.forEach(div => {
            if (div === clickedDiv) {
                div.classList.add('selected');
            } else {
                div.classList.remove('selected');
            }
        });

        // Remove the 'unclickable' class from the button with ID = goCheckout
        const goCheckoutButton = document.getElementById('goCheckout');
        if (goCheckoutButton) {
            goCheckoutButton.classList.remove('unclickable');
        }

        // Store the selected order value in local storage as eagledutyPlan
        localStorage.setItem('eagledutyPlan', value);
    };

    // Find all divs with data-custom-buy-now="radio"
    const radioDivs = document.querySelectorAll('div[data-custom-buy-now="radio"]');
    
    radioDivs.forEach(div => {
        // Set the data-custom-value based on data-custom-order
        const order = div.getAttribute('data-custom-order');
        if (orderValues[order]) {
            div.setAttribute('data-custom-value', orderValues[order]);
        }

        div.addEventListener('click', function() {
            const value = this.getAttribute('data-custom-value');
            setSelectValue(value, this);
        });
    });
});

