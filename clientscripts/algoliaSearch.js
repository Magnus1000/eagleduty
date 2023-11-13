// Log the initiation of the script
console.log("globalSearch2.js script initiated");

// Import autocomplete from Algolia Autocomplete library
console.log('Importing autocomplete library...');
const { autocomplete } = window['@algolia/autocomplete-js'];
console.log('Autocomplete library loaded successfully!');

// Initialize Algolia Search Client
const searchClient = algoliasearch('CWUIX0EWFE', '4cd4c82105f395affbc472c07a9789c8');

function AlgoliaAutocomplete() {
    console.log("AlgoliaAutocomplete function called");

    // Function to create the autocomplete instance
    const autoCompleteInstance = autocomplete({
        container: '#htsSearch',
        placeholder: 'Search for products',
        getSources({ query }) {
            console.log("Fetching sources for query:", query);
            return [
                {
                    sourceId: 'products',
                    getItemInputValue: ({ item }) => item.name,
                    getItems() {
                        console.log("Performing Algolia search with query:", query);
                        // Perform an Algolia search with the query
                        return searchClient
                            .initIndex('treccy_races_all')
                            .search(query)
                            .then(({ hits }) => {
                                console.log("Algolia search results:", hits);
                                return hits;
                            })
                            .catch((error) => {
                                console.error("Error performing Algolia search:", error);
                                return [];
                            });
                    },
                    templates: {
                        item({ item }) {
                            // Custom rendering for each item
                            console.log("Rendering item:", item);
                            return `<div>${item.name}</div>`;
                        },
                        noResults() {
                            // Custom message when no results are found
                            console.log("No results found for query:", query);
                            return "No races for this query.";
                        },
                    },
                },
            ];
        },
        // Override the render method to display results in 'resultsColumn' div
        render({ children }, root) {
            console.log("Rendering autocomplete results");
            const resultsContainer = document.querySelector('#resultsColumn');
            if (!resultsContainer) {
                console.log("Target div '#resultsColumn' not found");
                return; // Ensure the target div exists
            }
            resultsContainer.innerHTML = ''; // Clear previous results

            // Check if 'children' is an array and iterate if it is
            if (Array.isArray(children)) {
                children.forEach(child => renderChild(child, resultsContainer));
            } else if (children && typeof children === 'object') {
                // Handle a single child object
                renderChild(children, resultsContainer);
            } else {
                console.log("Unexpected format for children:", children);
            }
        }
    });

    function renderChild(child, container) {
        let actualItem = null;
    
        // Check if the structure resembles the expected nested object from the output
        if (child.props && child.props.children && child.props.children[0].props && 
            child.props.children[0].props.children && child.props.children[0].props.children[1] && 
            child.props.children[0].props.children[1].props && child.props.children[0].props.children[1].props.children && 
            child.props.children[0].props.children[1].props.children[0] && 
            child.props.children[0].props.children[1].props.children[0].props) {
            
            actualItem = child.props.children[0].props.children[1].props.children[0].props;
        }
    
        // If actualItem is still null, it means the structure was not as expected
        if (!actualItem) {
            console.error("Could not find the actual item within the provided child structure.");
            return;
        }
    
        const resultDiv = document.createElement('div');
        resultDiv.style.display = 'flex';
        resultDiv.style.justifyContent = 'center';
        resultDiv.style.alignItems = 'center';
        resultDiv.style.padding = '10px';
        resultDiv.style.borderBottom = '1px solid #ccc';
    
        // Access the 'name_ag' property from the actual item
        const resultText = document.createTextNode(actualItem.name_ag || 'No name');
        resultDiv.appendChild(resultText);
        container.appendChild(resultDiv);
        console.log("Added child to resultsContainer:", actualItem);
    }    
}

// Call AlgoliaAutocomplete function on page load
window.addEventListener('load', AlgoliaAutocomplete);
