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
    const result = { special_json: {}, rates: {} };

    // Splitting the string by ')' to get each section
    const sections = str.split(')').map(section => section.trim());

    sections.forEach(section => {
        // Skip empty sections
        if (!section) return;

        let special_json, countries;
        if (section.includes('Free')) {
            // Handling 'Free' countries
            special_json = 0;
            countries = section.replace('Free ', '').trim();
        } else if (section.includes('%') || section.includes('See')) {
            // Handling percentages or specific text instructions
            [special_json, countries] = section.split(' (');
            special_json = special_json.trim();
        } else {
            // Skip sections that don't match the expected format
            return;
        }

        const countryList = countries.split(',').map(country => country.trim());
        countryList.forEach(country => {
            result.rates[country] = special_json;
        });
    });

    return result;
}


