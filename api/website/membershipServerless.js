const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const supabaseUrl = 'https://esdqgomknfbxfsqxumjt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZHFnb21rbmZieGZzcXh1bWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MzQ4MDksImV4cCI6MjAxNTExMDgwOX0.J20zZ-OKlT7wTS3QnkFmgqe1XzBIMQ5Nm_RqUXISTxY';
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHandler = cors(); // Initialize CORS handler

module.exports = async (req, res) => {
    console.log('Inside the serverless function...'); // Debugging

    // Handle CORS first before doing anything else
    corsHandler(req, res, async () => {
        const { uuid, action } = req.query;

        if (!uuid || !action) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        try {
            if (action === 'fetch') {
                const { data, error } = await supabase
                    .from('user_events')
                    .select('daily_count')
                    .eq('uuid', uuid)
                    .single();

                if (error) {
                    return res.status(500).json({ error: 'Failed to fetch data from Supabase' });
                }

                return res.status(200).json({ daily_count: data.daily_count });
            } else if (action === 'create') {
                const { data, error } = await supabase
                    .from('user_events')
                    .insert([{ uuid }])
                    .single();

                if (error) {
                    return res.status(500).json({ error: 'Failed to create a new row in Supabase' });
                }

                return res.status(200).json({ message: 'New row created successfully' });
            } else {
                return res.status(400).json({ error: 'Invalid action' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    });
};
