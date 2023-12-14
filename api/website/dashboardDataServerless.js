// Import the Axios library
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Access environment variables
        const tableID = process.env.AIRTABLE_DASHBOARD_TABLE_ID; 
        const baseID = process.env.AIRTABLE_BASE_ID;
        const apiKey = process.env.AIRTABLE_API_KEY;  
        const apiURL = `https://api.airtable.com/v0/${baseID}/${tableID}`;

        // Make an HTTP request using Axios
        const response = await axios.get(apiURL, {
            headers: {
                'Authorization': `Bearer ${apiKey}` // Replace header structure based on your API's requirements
            }
        });

        // Send the response back
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in serverless function:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
