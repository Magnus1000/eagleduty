const Airtable = require('airtable');

module.exports = async (req, res) => {
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
                },
            },
        ]);

        res.status(200).json({ message: 'Record created successfully' });
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Failed to create record' });
    }
};