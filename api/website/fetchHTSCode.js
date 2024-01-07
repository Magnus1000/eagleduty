const axios = require('axios');
const cors = require('cors');
const Airtable = require('airtable');

const corsHandler = cors();

module.exports = async (req, res) => {
    try {
        console.log('Inside the serverless function...');

        corsHandler(req, res, async () => {
            if (req.query && req.query.htsno) { // Check if req.query and req.query.htsno are defined
                const htsno = req.query.htsno; // Get the htsno from req.query
                console.log('htsno:', htsno);

                // Initialize Airtable with your base ID and API key
                const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID);
            
                try {
                    // Fetch the record from the specified table where htsno is equal to req.query.htsno
                    const record = await base(process.env.AIRTABLE_TABLE_ID).select({
                        filterByFormula: `htsno = "${htsno}"`
                    }).firstPage();
            
                    if (record && record.length > 0) {
                        // Do something with the fetched record
                        console.log('Fetched record:', record[0]);

                        // Return the fetched record as the response
                        res.status(200).json({ record: record[0] });
                    } else {
                        console.log('No record found');
                        res.status(404).json({ error: 'No record found' });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            } else {
                console.error('Error: htsno is undefined');
                res.status(400).json({ error: 'Bad Request' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};