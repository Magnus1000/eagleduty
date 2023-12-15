function decimalToRoman(decimal) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let roman = '';
    for (const numeral of romanNumerals) {
        while (decimal >= numeral.value) {
            roman += numeral.symbol;
            decimal -= numeral.value;
        }
    }

    return roman;
}

module.exports = async (req, res) => {
    try {
        // Get the string from the request parameters
        const { string } = req.query;

        // Extract the chapter and section numbers
        const chapter = string.substring(2, 4);
        const section = decimalToRoman(parseInt(string.substring(0, 2)));

        // Define the chapter and section names
        const chapterName = `Chapter ${chapter}`;
        const sectionName = `Section ${section}`;

        // Prepare the response body
        const responseBody = {
            chapter: chapterName,
            section: sectionName
        };

        // Return the response
        res.status(200).json(responseBody);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};