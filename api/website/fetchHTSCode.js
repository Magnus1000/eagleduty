const axios = require('axios');
const cors = require('cors');
const Airtable = require('airtable');

const corsHandler = cors();

module.exports = async (req, res) => {
    try {
        console.log('Inside the serverless function...');

        corsHandler(req, res, async () => {
            if (req.params && req.params.htsno) { // Check if req.params and req.params.htsno are defined
                const htsno = req.params.htsno; // Get the htsno from req.params
                console.log('htsno:', htsno);

                // Initialize Airtable with your base ID and API key
                const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID);
            
                try {
                    // Fetch the record from the specified table where htsno is equal to req.params.htsno
                    const records = await base(process.env.AIRTABLE_TABLE_ID).select({
                        filterByFormula: `htsno = "${htsno}"`
                    }).all();
            
                    if (records.length > 0) {
                        // Do something with the fetched record(s)
                        console.log('Fetched record(s):', records);
                    } else {
                        console.log('No record found');
                    }
            
                    res.status(200).json({ message: 'Record fetched successfully' });
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