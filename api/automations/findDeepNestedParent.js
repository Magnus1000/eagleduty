const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { indent, sortNum } = req.query;
        const parentIndent = indent - 1;

        const airtableKey = process.env.AIRTABLE_KEY;
        const airtableTableId = process.env.AIRTABLE_TABLE_ID;
        const airtableBaseId = process.env.AIRTABLE_BASE_ID;

        let foundRecordId = null;

        for (let currentSortNum = sortNum; currentSortNum > 0; currentSortNum -= 50) {
            const endSortNum = Math.max(currentSortNum - 49, 1);

            const response = await axios.get(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?filterByFormula=AND(sortNum>=${endSortNum}, sortNum<=${currentSortNum}, indent=${parentIndent})`, {
                headers: {
                    Authorization: `Bearer ${airtableKey}`,
                },
            });

            const records = response.data.records;

            if (records.length > 0) {
                foundRecordId = records[0].id; // Assuming records are ordered by sortNum
                break;
            }

            console.log(`Checked sortNum range ${endSortNum} - ${currentSortNum}`);
        }

        console.log(`Found Record ID: ${foundRecordId}`);
        res.status(200).json({ recordId: foundRecordId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the records' });
    }
};
