// Import required modules
const cors = require('cors');

// Define the serverless function
module.exports = async (req, res) => {
    // Enable CORS
    await cors()(req, res);

    // Extract the percentage value from the request body
    const { string } = req.body;
    const percentage = string.match(/\d+(\.\d+)?%/);

    // Send the extracted percentage value as the response
    res.status(200).json({ percentage: percentage[0] });
};