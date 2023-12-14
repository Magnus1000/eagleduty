// Import the Axios library
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Access environment variables
        const apiUrl = process.env.API_URL; 
        const apiKey = process.env.API_KEY;  

        // Make an HTTP request using Axios
        const response = await axios.get(apiUrl, {
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
