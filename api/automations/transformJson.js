const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Ensure 'url' is a query parameter or part of the body, not a route parameter
        const url = req.query.url || req.body.url;
        
        // If 'url' is not provided, throw an error
        if (!url) {
            throw new Error('URL parameter is required');
        }

        const response = await axios.get(url);
        const json_data = response.data;
        const processed_data = process_json(json_data);
        res.status(200).json(processed_data);
    } catch (error) {
        // Log the error for debugging
        console.error(error.message);
        // Respond with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
};

function process_json(json_data) {
    return json_data.map(entry => {
        const htsno = entry.htsno || "";
        const footnotes = entry.footnotes ? JSON.stringify(entry.footnotes) : "";
        if (htsno === null || footnotes === null) {
            throw new Error('JSON value is null');
        }
        return { ...entry, htsno, footnotes };
    });
}