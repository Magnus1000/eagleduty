const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Extract the record IDs from the request query parameters
        const recordIds = req.query.recordIds;

        // Make a GET request to the Airtable API to fetch the records
        const response = await axios.get(`https://api.airtable.com/v0/app65mmXH80sle2qO/tblMOYEO2dSqBJMLl?filterByFormula=OR(${recordIds.map(id => `RECORD_ID='${id}'`).join(',')})`, {
            headers: {
                Authorization: `Bearer patkPgQNIsCJaci3p.512c335a388e6c3dd7838fecfe4de785dd48b242b87781fd22fbbb1d4b09e917`,
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