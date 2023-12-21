// Vercel serverless function for formatting HS codes
module.exports = async (req, res) => {
    try {
        // Check if the request body is valid
        if (!req.body || !Array.isArray(req.body.hsCodes)) {
            return res.status(400).send('Invalid request');
        }

        const hsCodes = req.body.hsCodes;

        // Function to reformat the HS code
        const reformatHSCode = (code) => {
            // Check if the code is in the expected format
            if (!/^\d{4}\.\d{2}\.\d{4}$/.test(code)) {
                throw new Error(`Invalid HS Code format: ${code}`);
            }

            // Reformat the code
            return `${code.substring(0, 4)}.${code.substring(5, 7)}.${code.substring(8, 10)}.${code.substring(10, 12)}`;
        };

        // Format each HS code
        const formattedHSCodes = hsCodes.map(reformatHSCode);

        // Send back the formatted codes
        res.status(200).json({ formattedHSCodes });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
