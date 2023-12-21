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
            // Remove periods
            const strippedCode = code.replace(/\./g, '');
        
            // Handle 8-digit codes
            if (strippedCode.length === 8) {
                const formattedEightDigitCode = `${strippedCode.substring(0, 4)}.${strippedCode.substring(4, 6)}.${strippedCode.substring(6)}`;
                const formattedTenDigitCode = `${formattedEightDigitCode}.00`;
                return [formattedEightDigitCode, formattedTenDigitCode];
            } 
            // Handle 10-digit codes
            else if (strippedCode.length === 10) {
                const formattedTenDigitCode = `${strippedCode.substring(0, 4)}.${strippedCode.substring(4, 6)}.${strippedCode.substring(6, 8)}.${strippedCode.substring(8)}`;
                const eightDigitCode = strippedCode.substring(0, 8);
                const formattedEightDigitCode = `${eightDigitCode.substring(0, 4)}.${eightDigitCode.substring(4, 6)}.${eightDigitCode.substring(6)}`;
                return [formattedEightDigitCode, formattedTenDigitCode];
            } 
            // Skip codes that are not 8 or 10 digits
            else {
                console.log(`Skipping invalid code length for '${code}'. Expected 8 or 10 digits, got ${strippedCode.length}.`);
                return null; // Return null to indicate the code should be skipped
            }
        };
        
        
        

        // Process each HS code
        const results = hsCodes.flatMap(processHSCode);

        // Check for any errors
        const errors = results.filter(result => typeof result === 'object' && result.error);
        if (errors.length > 0) {
            console.log('Errors:', errors);
            return res.status(400).json({ errors });
        }

        // Filter out valid results and send response
        const validResults = results.filter(result => typeof result === 'string');
        console.log('Response Data', validResults);
        res.status(200).json(validResults);
    } catch (error) {
        console.log('Internal Server Error:', error.message);
        res.status(500).send(error.message);
    }
};