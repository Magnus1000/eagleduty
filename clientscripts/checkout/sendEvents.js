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
});

