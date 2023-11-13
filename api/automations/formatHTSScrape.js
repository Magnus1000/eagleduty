module.exports = async function (req, res) {
    if (req.method === 'POST') {
        try {
            const { headings, chapters } = req.body;
            const sections = [];
            let currentSection = {};

            // This function will handle parsing and processing the chapter titles and their corresponding descriptions.
            const processChapters = (start, end, chapters) => {
                const chapterData = {};
                for (let i = start; i <= end; i++) {
                    const chapterTitle = `Chapter ${i}`;
                    const chapterIndex = chapters.findIndex(chapter => chapter.startsWith(chapterTitle));
                    if (chapterIndex !== -1 && chapters[chapterIndex + 1]) {
                        // Assign the description which directly follows the chapter title.
                        chapterData[chapterTitle] = chapters[chapterIndex + 1];
                    }
                }
                return chapterData;
            };            

            // Loop through each heading and determine if it's a section, chapter, or description.
            headings.forEach((heading) => {
                if (heading.startsWith('Section')) {
                    // If the current section already has a title, push it to the sections array.
                    if (currentSection.title) {
                        sections.push(currentSection);
                    }
                    // Create a new section object with the current heading as the title.
                    currentSection = { title: heading, chapters: {} };
                } else if (heading.startsWith('Chapters') || heading.startsWith('Chapter')) {
                    // If the heading starts with "Chapters" or "Chapter", set the chapter range for the current section.
                    currentSection.chapterRange = heading;
                } else {
                    // If the heading is not a section or chapter, assume it's a description and assign it to the current section.
                    currentSection.description = heading;
                }
            });

            // Push the last section if it has a title.
            if (currentSection.title) {
                sections.push(currentSection);
            }

            // Iterate over the sections to process chapters within the range specified.
            sections.forEach((section) => {
                try {
                    const chapterRange = section.chapterRange.match(/\d+/g);
                    if (chapterRange) {
                        const start = parseInt(chapterRange[0]);
                        const end = chapterRange[1] ? parseInt(chapterRange[1]) : start;
                        // Process chapters for the current section's range and assign it to the section.
                        section.chapters = processChapters(start, end, chapters);
                    } else {
                        throw new Error(`Invalid chapter range: ${section.chapterRange}`);
                    }
                } catch (error) {
                    console.error(error);
                }
            });

            // Convert the sections object to a JSON string with indentation for readability.
            const formattedData = JSON.stringify(sections, null, 2);
            // Send the formatted data as a successful response.
            res.status(200).json(formattedData);
        } catch (error) {
            // Log any caught errors and return a 500 Internal Server Error status.
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // If the method is not POST, return a 405 Method Not Allowed status.
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};