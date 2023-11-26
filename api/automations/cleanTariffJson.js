const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Extract the JSON data from the request body
        const data = req.body;

        // Remove the "id" key from each object
        const modifiedData = data.map(obj => {
            const { id, ...rest } = obj;
            return rest;
        });

        // Send the modified JSON data as the response
        res.status(200).json(modifiedData);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};