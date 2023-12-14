// Import the Axios and CORS libraries
const axios = require('axios');
const cors = require('cors');

// Initialize CORS handler
const corsHandler = cors();

module.exports = async (req, res) => {
    try {
        console.log('Inside the serverless function...'); // Debugging

        // Handle CORS first before doing anything else
        corsHandler(req, res, async () => {
            // Access environment variables
            const tableID = process.env.AIRTABLE_DASHBOARD_TABLE_ID; 
            const baseID = process.env.AIRTABLE_BASE_ID;
            const apiKey = process.env.AIRTABLE_KEY;  
            const apiURL = `https://api.airtable.com/v0/${baseID}/${tableID}?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=asc`;

            // Make an HTTP request using Axios
            const response = await axios.get(apiURL, {
                headers: {
                    'Authorization': `Bearer ${apiKey}` 
                }
            });

            // Send the response back
            res.status(200).json(response.data);
        });
    } catch (error) {
        console.error('Error in serverless function:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};