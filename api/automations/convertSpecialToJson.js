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

    // Splitting the string by ')' to get each section
    const sections = str.split(')').map(section => section.trim());

    sections.forEach(section => {
        // Skip empty sections
        if (!section) return;

        let rate, countries;
        if (section.includes('Free')) {
            // Handling 'Free' countries
            rate = 0;
            countries = section.replace('Free ', '').trim();
        } else if (section.includes('%') || section.includes('See')) {
            // Handling percentages or specific text instructions
            [rate, countries] = section.split(' (');
            rate = rate.trim();
        } else {
            // Skip sections that don't match the expected format
            return;
        }

        const countryList = countries.split(',').map(country => country.trim());
        countryList.forEach(country => {
            result.rates[country] = rate;
        });
    });

    return result;
}


