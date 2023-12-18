document.addEventListener('DOMContentLoaded', () => {
    const codeRows = document.querySelectorAll('.hs-code-row');
    const codeDivs = document.querySelectorAll('.hs-code-div');

    // Function to add the "hidden" class to code rows with non-zero indent
    function hideCodeRowsWithNonZeroIndent() {
        codeRows.forEach((row) => {
            const indentMargin = row.getAttribute('data-indent-margin');
            if (indentMargin && parseInt(indentMargin) !== 0) {
                row.classList.add('hidden');
            }
        });
    }

    // Loop through each code div
    codeDivs.forEach((div) => {
        const indentMargin = div.getAttribute('data-indent-margin');
        if (indentMargin) {
            const leftMargin = parseInt(indentMargin) * 1 + 'rem';
            div.style.marginLeft = leftMargin;

            // Add click event listener to each code div
            div.addEventListener('click', (event) => {
                const clickedID = event.target.getAttribute('data-id');
                console.log('Element clicked:', event.target);

                // Find the code rows with matching indent margin and htsno
                const targetDivs = document.querySelectorAll(`.hs-code-row[data-parent-id="${clickedID}"]`);

                // Toggle the hidden class for each target div
                targetDivs.forEach((targetDiv) => {
                    targetDiv.classList.toggle('hidden');
                    console.log('Target element hidden:', targetDiv.classList.contains('hidden'));
                });
            });
        }
    });

    // Call the function to hide code rows with non-zero indent
    hideCodeRowsWithNonZeroIndent();
});