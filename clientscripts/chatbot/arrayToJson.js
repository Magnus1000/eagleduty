const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { array1, array2, array3 } = req.body;

        // Group the arrays based on their corresponding indices
        const groupedArrays = [];
        for (let i = 0; i < array1.length; i++) {
            groupedArrays.push({
                item1: array1[i],
                item2: array2[i],
                item3: array3[i]
            });
        }

        // Convert the grouped arrays to JSON
        const jsonData = JSON.stringify(groupedArrays);

        // Make a POST request to an API endpoint with the JSON data
        const response = await axios.post('https://api.example.com/endpoint', jsonData);

        // Return the response as a valid JSON response
        res.status(200).json(response.data);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};