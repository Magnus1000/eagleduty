window.addEventListener('load', function() {
    const uuid = localStorage.getItem('uuid');
    const event_type = 'page_view';
    const event_page = window.location.href;

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    }

    // Add event listener to the form field
    const emailField = document.getElementById('wf-ecom-email');
    const emailInputHandler = debounce(function() {
        const emailStartedEvent = {
            uuid,
            event_content: '',
            event_type: 'email_started',
            event_page,
        };

        fetch('https://eagleduty-magnus1000team.vercel.app/api/website/createAirtableEvent.js', {
            method: 'POST',
            body: JSON.stringify(emailStartedEvent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Email started event created successfully');
                // Remove the event listener after it has been triggered once
                emailField.removeEventListener('input', emailInputHandler);
            } else {
                console.error('Failed to create email started event');
            }
        })
        .catch(error => {
            console.error('Error creating email started event:', error);
        });
    }, 500); // Adjust the delay as needed

    emailField.addEventListener('input', emailInputHandler);

    // Add event listener to the form field
    const customerName = document.getElementById('wf-ecom-billing-name');
    const addressInputHandler = debounce(function() {
        const detailsStartedEvent = {
            uuid,
            event_content: '',
            event_type: 'address_started',
            event_page,
        };

        fetch('https://eagleduty-magnus1000team.vercel.app/api/website/createAirtableEvent.js', {
            method: 'POST',
            body: JSON.stringify(detailsStartedEvent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Address started event created successfully');
                // Remove the event listener after it has been triggered once
                customerName.removeEventListener('input', addressInputHandler);
            } else {
                console.error('Failed to create address started event');
            }
        })
        .catch(error => {
            console.error('Error creating address started event:', error);
        });
    }, 500); // Adjust the delay as needed

    customerName.addEventListener('input', addressInputHandler);
});