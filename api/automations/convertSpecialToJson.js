module.exports = (req, res) => {
    const inputString = req.query.inputString;

    if (!inputString) {
        res.status(400).send('No input string provided');
        return;
    }

    const jsonResponse = parseString(inputString);
    res.json(jsonResponse);
};

function parseString(str) {
    const result = { rates: {} };

    // Splitting the string by 'Free (' and then by ')' to isolate each section
    const sections = str.split('Free (').slice(1).map(section => section.split(')')[0]);

    sections.forEach(section => {
        // Checking if the section contains '%' or 'See', which indicates a special rate format
        if (section.includes('%') || section.includes('See')) {
            const [rate, countries] = section.split(' (');
            const countryList = countries.split(',').map(country => country.trim());
            countryList.forEach(country => {
                // Trim and assign the specific rate or text instruction to each country
                result.rates[country] = rate.trim();
            });
        } else {
            // For 'Free' countries, setting rate to 0
            const countryList = section.split(',').map(country => country.trim());
            countryList.forEach(country => {
                result.rates[country] = 0;
            });
        }
    });

    return result;
}

