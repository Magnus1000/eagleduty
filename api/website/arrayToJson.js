module.exports = async (req, res) => {
    try {
        const { array1, array2, array3, array4 } = req.body;

        // Group the arrays based on their corresponding indices
        const groupedArrays = [];
        for (let i = 0; i < array1.length; i++) {
            groupedArrays.push({
                htsno1: array1[i],
                htsno2: array2[i],
                htsno3: array3[i],
                htsno4: array4[i]
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