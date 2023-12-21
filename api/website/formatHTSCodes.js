module.exports = async (req, res) => {
    try {
        // Log the request body
        console.log('Request Body:', req.body);

        // Check if the request body is valid
        if (!req.body || typeof req.body.hsCodes !== 'string') {
            console.log('Invalid request: Body must contain a string under "hsCodes" key.');
            return res.status(400).send('Invalid request: Body must contain a string under "hsCodes" key.');
        }

        // Split the string into an array of HS codes and remove whitespace
        const hsCodes = req.body.hsCodes.split(',').map(code => code.trim());

        // Function to validate and reformat the HS code
        const processHSCode = (code) => {
            // Remove periods and check the length of the code
            const strippedCode = code.replace(/\./g, '');
            if (strippedCode.length !== 8 && strippedCode.length !== 10) {
                console.log(`Invalid code length for '${code}'. Expected 8 or 10 digits, got ${strippedCode.length}.`);
                return { error: `Invalid code length for '${code}'. Expected 8 or 10 digits, got ${strippedCode.length}.` };
            }

            // Reformat the code
            const formattedCode = `${code.substring(0, 4)}.${code.substring(4, 6)}.${code.substring(6, 8)}.${strippedCode.length === 8 ? '00' : code.substring(8, 10)}`;

            // Assign value based on code length
            const value = strippedCode.length === 8 ? 10 : 30;

            return { code: formattedCode, value };
        };

        // Process each HS code
        const results = hsCodes.map(processHSCode);

        // Check for any errors
        const errors = results.filter(result => result.error);
        if (errors.length > 0) {
            console.log('Errors:', errors);
            return res.status(400).json({ errors });
        }

        // Filter out valid results and send response
        const validResults = results.filter(result => !result.error);
        res.status(200).json({ validResults });
    } catch (error) {
        console.log('Internal Server Error:', error.message);
        res.status(500).send(error.message);
    }
};