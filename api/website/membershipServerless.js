const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHandler = cors(); // Initialize CORS handler

module.exports = async (req, res) => {
    console.log('Inside the serverless function...'); // Debugging

    // Handle CORS first before doing anything else
    corsHandler(req, res, async () => {
        const { uuid, action, count } = req.query;
        console.log('Serverless query parameters:', { uuid, action, count }); // Debugging

        if (!uuid || !action) {
            console.log('Missing required parameters:', { uuid, action }); // Debugging
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        try {
            if (action === 'fetch') {
                try {
                    const { data, error, status } = await supabase
                        .from('user_events')
                        .select('calc_count')
                        .eq('uuid', uuid)
                        .single();

                    if (error) {
                        console.log('Error fetching data:', error); // Debugging
                        return res.status(500).json({ error: 'Error fetching data' });
                    }

                    if (!data) {
                        console.log('No data found for the provided UUID:', uuid); // Debugging
                        return res.status(404).json({ error: 'No data found for the provided UUID' });
                    }

                    console.log('Fetched data:', data); // Debugging
                    return res.status(200).json({ calc_count: data.calc_count });
                } catch (error) {
                    console.log('Error fetching data:', error); // Debugging
                    return res.status(500).json({ error: 'Error fetching data' });
                }
            } else if (action === 'create') {
                const { data, error } = await supabase
                    .from('user_events')
                    .insert([{ uuid, calc_count: 0 }])
                    .single();

                if (error) {
                    console.log('Failed to create a new row in Supabase:', error); // Debugging
                    return res.status(500).json({ error: 'Failed to create a new row in Supabase' });
                }

                console.log('New row created:', data); // Debugging
                return res.status(200).json({ message: 'New row created successfully' });
            } else if (action === 'update') {
                const { data, error } = await supabase
                    .from('user_events')
                    .update({ calc_count: count })
                    .eq('uuid', uuid)
                    .single();

                if (error) {
                    console.log('Failed to update the row in Supabase:', error); // Debugging
                    return res.status(500).json({ error: 'Failed to update the row in Supabase' });
                }

                console.log('Row updated:', data); // Debugging
                return res.status(200).json({ message: 'Row updated successfully' });
            } else {
                console.log('Invalid action:', action); // Debugging
                return res.status(400).json({ error: 'Invalid action' });
            }
        } catch (error) {
            console.log('An error occurred:', error); // Debugging
            return res.status(500).json({ error: 'An error occurred' });
        }
    });
};