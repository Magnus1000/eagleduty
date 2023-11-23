const { createClient } = require('@supabase/supabase-js');
const cors = require('@vercel/node-cors');

const supabaseUrl = 'https://esdqgomknfbxfsqxumjt.supabase.co';
const supabaseKey = 'https://esdqgomknfbxfsqxumjt.supabase.co';
const supabase = createClient(supabaseUrl, supabaseKey);

const handler = async (req, res) => {
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
};

module.exports = cors()(handler);