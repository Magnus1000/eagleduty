document.addEventListener('DOMContentLoaded', function() {
    // Define the values to be assigned
    const orderValues = {
        '1': 'a27265b4b3a928e9950bb0c7d580a659',
        '2': '9fff0556c26eed38379dfe94e4b90aeb',
        '3': '023d5410f566bee8336708b46f235ae7'
    };

    // Function to set the select value based on the clicked button's data-order-value attribute
    const setSelectValue = (value, clickedButton) => {
        const select = document.querySelector('select[data-custom-buy-now="select"]');
        if (select) {
            select.value = value;
            console.log(`Set select value to ${value}`);
            // Trigger change event in case there are any listeners
            const event = new Event('change');
            select.dispatchEvent(event);
        }

        // Click the goCheckout button
        const goCheckoutButton = document.getElementById('goCheckout');
        if (goCheckoutButton) {
            goCheckoutButton.click();
        }

        // Store the selected order value in local storage as eagledutyPlan
        localStorage.setItem('eagledutyPlan', value);
    };

    // Find all buttons with the class "button-primary-blue"
    const buttons = document.querySelectorAll('.button-primary-blue');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-order-value');
            console.log(`Clicked button with data-order-value: ${value}`)
            setSelectValue(value, this);
        });
    });
});