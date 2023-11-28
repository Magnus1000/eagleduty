const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Extract the query parameters from the request
        const { indent, sortNum } = req.query;
        const parentIndent = indent - 1;

        // Get the Airtable key, table ID, and base ID from environment variables
        const airtableKey = process.env.AIRTABLE_KEY;
        const airtableTableId = process.env.AIRTABLE_TABLE_ID;
        const airtableBaseId = process.env.AIRTABLE_BASE_ID;

        // Calculate the number of batches needed
        const numBatches = Math.ceil(sortNum / 50);

        // Initialize the found record ID
        let foundRecordId = null;

        // Iterate through each batch
        for (let batch = 0; batch < numBatches; batch++) {
            // Calculate the range for the current batch
            const startSortNum = sortNum - (batch * 50);
            const endSortNum = startSortNum - 49;

            // Make a GET request to the Airtable API to fetch the records for the current batch
            const response = await axios.get(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?filterByFormula=AND(sortNum>=${endSortNum}, sortNum<=${startSortNum}, indent=${parentIndent})`, {
                headers: {
                    Authorization: `Bearer ${airtableKey}`,
                },
            });

            // Extract the records from the response
            const records = response.data.records;

            // Find the first record that matches the criteria in the current batch
            const matchingRecord = records.find(record => record.fields.indent === parentIndent);
            if (matchingRecord) {
                foundRecordId = matchingRecord.id;
                break;
            }

            // Log the current batch and range
            console.log(`Batch ${batch + 1}: Range ${startSortNum} - ${endSortNum}`);
        }

        // Log the final result
        console.log(`Found Record ID: ${foundRecordId}`);

        // Send the found record ID as the response
        res.status(200).json({ recordId: foundRecordId });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the records' });
    }
};