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

        // Change the button text to the loading spinner
        clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M256 64C150 64 64 150 64 256s86 192 192 192c70.1 0 131.3-37.5 164.9-93.6l.1 .1c-6.9 14.9-1.5 32.8 13 41.2c15.3 8.9 34.9 3.6 43.7-11.7c.2-.3 .4-.6 .5-.9l0 0C434.1 460.1 351.1 512 256 512C114.6 512 0 397.4 0 256S114.6 0 256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/><path class="fa-primary" d="M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"/></svg>';

        // Wait for 3 seconds before clicking the goCheckout button
        setTimeout(() => {
            // Click the goCheckout button
            const goCheckoutButton = document.getElementById('goCheckout');
            if (goCheckoutButton) {
                goCheckoutButton.click();
                console.log('Clicked goCheckout button');
            }
        }, 3000);

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