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
        resultItem.setAttribute('data-object-id', hit.objectID);
        resultItem.setAttribute('data-htsno', hit.htsno);
        resultItem.setAttribute('data-description', hit.description);
        resultItem.setAttribute('data-chapter-name', hit.chapterName);
        resultItem.setAttribute('data-chapter-description', hit.chapterDescription);
        resultItem.setAttribute('data-section-name', hit.sectionName);
        resultItem.setAttribute('data-section-description', hit.sectionDescription);
        resultItem.setAttribute('data-general', hit.general);
        resultItem.setAttribute('data-other', hit.other);
        resultItem.setAttribute('data-special-json', JSON.stringify(hit.special_json));
        resultItem.setAttribute('data-units', hit.units);

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

        // Create and append the description element
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        const descriptionTextElement = document.createElement('span');
        descriptionTextElement.textContent = hit.description;
        descriptionTextElement.classList.add('description-text');
        descriptionElement.appendChild(descriptionTextElement);
        resultItem.appendChild(descriptionElement);

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

        // Create and append the radio button element
        const radioButtonElement = document.createElement('input');
        radioButtonElement.type = 'radio';
        radioButtonElement.name = 'htsno';
        radioButtonElement.value = hit.htsno;
        radioButtonElement.classList.add('result-radio');
        resultItem.appendChild(radioButtonElement);

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

// Function to Animate the Data Refresh icons
function rotateIcons() {
  const fxIcon = document.querySelector('#fxRefreshIcon');
  const htsIcon = document.querySelector('#htsRefreshIcon');
  const dutyIcon = document.querySelector('#dutyRefreshIcon');
  let rotation = 0;
  const start = Date.now();
  const interval = setInterval(() => {
    rotation += 10;
    fxIcon.style.transform = `rotate(${rotation}deg)`;
    htsIcon.style.transform = `rotate(${rotation}deg)`;
    dutyIcon.style.transform = `rotate(${rotation}deg)`;
    if (Date.now() - start > 3000) {
      clearInterval(interval);
      const refreshTime = document.querySelector('#refreshTime');
      const refreshTimeWrapper = document.querySelector('#refreshTimeWrapper');
      refreshTimeWrapper.style.display = 'flex';
      refreshTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit', hour12: true});
      const fxText = document.querySelector('#fxText');
      const htsText = document.querySelector('#htsText');
      const dutyText = document.querySelector('#dutyText');
      fxText.textContent = 'Fetched exchanged rates';
      htsText.textContent = 'Fetched HTS codes';
      dutyText.textContent = 'Fetched duty rates';
    }
  }, 20);
}

// Initialize the results container with 0 results
renderResults([]);

// Initialize the refresh icons
rotateIcons();