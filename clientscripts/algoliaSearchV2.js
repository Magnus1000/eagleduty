console.log("globalSearch2.js script initiated");

// Initialize Algolia Search Client
const searchClient = algoliasearch('ZHBXQEBA3W', '7c1a59f0885f557595cf95b1173c6d47');
const index = searchClient.initIndex('eagleDutyHtsCodes');

// Function to render the search results
function renderResults(hits) {
    const resultsContainer = document.querySelector('#resultsColumn');
    if (!resultsContainer) {
        console.log("Target div '#resultsColumn' not found");
        return; // Ensure the target div exists
    }

    // Clear out the current results
    resultsContainer.innerHTML = '';

    // Loop over the hits and create DOM elements for each item
    hits.forEach(hit => {
        // Create the main result item div
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item'); // Add any styling classes you need

        // Create and append the HTS code element
        const htsCodeWrapper = document.createElement('div');
        htsCodeWrapper.classList.add('hts-code-wrapper');
        const htsCodeElement = document.createElement('div');
        htsCodeElement.textContent = hit.htsno;
        htsCodeElement.classList.add('hts-code');
        htsCodeWrapper.appendChild(htsCodeElement);
        const htsCodeTextElement = document.createElement('div');
        htsCodeTextElement.textContent = 'HTS Code';
        htsCodeTextElement.classList.add('hts-code-text');
        htsCodeWrapper.appendChild(htsCodeTextElement);
        resultItem.appendChild(htsCodeWrapper);

        // Create and append the section and chapter details element
        const detailsElement = document.createElement('div');
        detailsElement.classList.add('details');

        // Create and append the section element
        const sectionElement = document.createElement('div');
        sectionElement.classList.add('section');
        const sectionNameElement = document.createElement('span');
        sectionNameElement.textContent = hit.sectionName;
        sectionNameElement.classList.add('section-name');
        sectionElement.appendChild(sectionNameElement);
        const sectionDescriptionElement = document.createElement('span');
        sectionDescriptionElement.textContent = hit.sectionDescription;
        sectionDescriptionElement.classList.add('section-description');
        sectionElement.appendChild(sectionDescriptionElement);
        detailsElement.appendChild(sectionElement);

        // Create and append the chapter element
        const chapterElement = document.createElement('div');
        chapterElement.classList.add('chapter');
        const chapterImageElement = document.createElement('div');
        chapterImageElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M334.5 446c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 88-192 0c-17.7 0-32-14.3-32-32L96 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64L0 208c0 70.7 57.3 128 128 128l192 0 0 88c0 9.6 5.7 18.2 14.5 22z"/></svg>'; // Replace with your SVG code
        chapterImageElement.classList.add('chapter-image');
        chapterElement.appendChild(chapterImageElement);
        const chapterNameElement = document.createElement('span');
        chapterNameElement.textContent = hit.chapterName;
        chapterNameElement.classList.add('chapter-name');
        chapterElement.appendChild(chapterNameElement);
        const chapterDescriptionElement = document.createElement('span');
        chapterDescriptionElement.textContent = hit.chapterDescription;
        chapterDescriptionElement.classList.add('chapter-description');
        chapterElement.appendChild(chapterDescriptionElement);
        detailsElement.appendChild(chapterElement);

        resultItem.appendChild(detailsElement);

        // Append the main result item div to the results container
        resultsContainer.appendChild(resultItem);
    });
}

// Function to handle search input changes
function handleSearchInput(event) {
  const query = event.target.value;

  // Only perform the search if the query is not empty
  if (query.trim()) {
    index.search(query)
      .then(({ hits }) => {
        console.log(`Search results for query "${query}":`, hits);
        renderResults(hits);
      })
      .catch(err => {
        console.error(err);
        // Handle errors or show a message if needed
      });
  } else {
    // Clear results if the query is empty
    renderResults([]);
  }
}

// Attach event listener to the search input
const searchInput = document.querySelector('#htsSearch');
searchInput.addEventListener('input', handleSearchInput);

// Initialize the results container with 0 results
renderResults([]);
