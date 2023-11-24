// Import required modules
const cors = require('cors');

// Define the serverless function
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Extract the percentage value from the request body
    const { string } = req.body.string;
    const percentage = string.match(/\d+(\.\d+)?%/);

    // Send the extracted percentage value as the response
    res.status(200).json({ percentage: percentage[0] });
};