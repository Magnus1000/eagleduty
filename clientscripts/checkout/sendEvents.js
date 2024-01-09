window.addEventListener('load', function() {
    const uuid = localStorage.getItem('uuid');
    const event_type = 'page_view';
    const event_page = window.location.href;

    fetch('https://eagleduty-magnus1000team.vercel.app/api/website/createAirtableEvent.js', {
        method: 'POST',
        body: JSON.stringify({ uuid, event_type, event_page }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Airtable event created successfully');
        } else {
            console.error('Failed to create Airtable event');
        }
    })
    .catch(error => {
        console.error('Error creating Airtable event:', error);
    });

    // Add event listener to the form field
    const emailField = document.getElementById('wf-ecom-email');
    emailField.addEventListener('input', function() {
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
    });

    // Add event listener to the form field
    const cardNumberField = document.querySelector('[data-wf-stripe-element-type="cardNumber"]');
    cardNumberField.addEventListener('input', function cardNumberInputHandler() {
        const cardNumberStartedEvent = {
            uuid,
            event_content: '',
            event_type: 'cardNumber_started',
            event_page,
        };

        fetch('https://eagleduty-magnus1000team.vercel.app/api/website/createAirtableEvent.js', {
            method: 'POST',
            body: JSON.stringify(cardNumberStartedEvent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Card number started event created successfully');
                // Remove the event listener after it has been triggered once
                cardNumberField.removeEventListener('input', cardNumberInputHandler);
            } else {
                console.error('Failed to create card number started event');
            }
        })
        .catch(error => {
            console.error('Error creating card number started event:', error);
        });
    });
});