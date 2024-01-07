const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const htsnoValue = urlParams.get('htsno');

    const apiUrl = `https://eagleduty-magnus1000team.vercel.app/api/website/fetchHTSCode.js?htsno=${htsnoValue}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        // Process the fetched data here
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}