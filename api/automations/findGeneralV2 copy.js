const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Extract the record IDs from the request query parameters
        let recordIds = req.query.recordIds;

        // Split the comma-separated string into an array
        recordIds = recordIds.split(',');

        // Get the Airtable key, table ID, and base ID from environment variables
        const airtableKey = process.env.AIRTABLE_KEY;
        const airtableTableId = process.env.AIRTABLE_TABLE_ID;
        const airtableBaseId = process.env.AIRTABLE_BASE_ID;

        // Make a GET request to the Airtable API to fetch the records
        const response = await axios.get(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?filterByFormula=OR(${recordIds.map(id => `RECORD_ID()='${id}'`).join(',')})`, {
            headers: {
                Authorization: `Bearer ${airtableKey}`,
            },
        });

        // Extract the records from the response
        const records = response.data.records;

        // Find the first record with a non-empty "general" field
        let foundRecordId = null;
        for (let i = records.length - 1; i >= 0; i--) {
            const record = records[i];
            if (record.fields.general) {
                foundRecordId = record.id;
                break;
            }
        }

        // Send the found record ID as the response
        res.status(200).json({ recordId: foundRecordId });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the records' });
    }
};