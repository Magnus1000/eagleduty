module.exports = async (req, res) => {
    try {
        const { array1, array2, array3, array4, array5, array6 } = req.body;

        // Group the arrays based on their corresponding indices
        const groupedArrays = [];
        for (let i = 0; i < array1.length; i++) {
            groupedArrays.push({
                htsno: array1[i],
                section_name: array2[i],
                chapter_name: array3[i],
                section_description: array4[i],
                chapter_description: array5[i],
                description: array6[i]
            });
        }

        // Convert the grouped arrays to JSON
        const jsonData = JSON.stringify(groupedArrays);

        // Return the response as a valid JSON response
        res.status(200).json(jsonData);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};