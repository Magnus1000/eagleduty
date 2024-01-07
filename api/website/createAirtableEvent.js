const axios = require('axios');
const cors = require('cors');
const Airtable = require('airtable');

const corsHandler = cors();

module.exports = async (req, res) => {
    try {
        console.log('Inside the serverless function...');

        corsHandler(req, res, async () => {
            const { uuid, event_content } = req.body;

            // Generate event time in ISO format
            const event_time = new Date().toISOString();
        
            // Initialize Airtable with your base ID and API key
            const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID);
        
            try {
                // Create a new record in the specified table
                await base('tbliG8KVKVOlwLQWh').create([
                    {
                        fields: {
                            uuid,
                            event_content,
                            event_time,
                            event_type: 'chat_form_submission',
                            event_page: 'https://www.eagleduty.io/chatbot', // Set the event_page field to 'https://www.eagleduty.io/chatbot'
                        },
                    },
                ]);
        
                res.status(200).json({ message: 'Record created successfully' });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};