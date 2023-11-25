console.log("globalSearch2.js script initiated");

// Initialize Algolia Search Client
const searchClient = algoliasearch('ZHBXQEBA3W', '7c1a59f0885f557595cf95b1173c6d47');
const index = searchClient.initIndex('eagleDutyHtsCodesEnhanced');

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
        resultItem.setAttribute('data-china-tariff-rate', hit.chinaTariffRate);
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
        htsCodeTextElement.textContent = 'hts code';
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

        // Create and append the radio circle element
        const radioCircleElement = document.createElement('div');
        radioCircleElement.classList.add('checked-result-circle');
        resultItem.appendChild(radioCircleElement);

        // Create and append the see details element
        const seeDetailsElement = document.createElement('div');
        seeDetailsElement.classList.add('result-see-details');
        resultItem.appendChild(seeDetailsElement);

        // Create and append the see details text element
        const seeDetailsTextElement = document.createElement('span');
        seeDetailsTextElement.textContent = 'See details';
        seeDetailsTextElement.classList.add('result-see-details-text');
        seeDetailsElement.appendChild(seeDetailsTextElement);

        // Create and append the see details icon element
        const seeDetailsIconElement = document.createElement('div');
        seeDetailsIconElement.classList.add('result-see-details-icon');
        seeDetailsElement.appendChild(seeDetailsIconElement);
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
        const placeholderWrapper = document.querySelector('#placeholderWrapper');
        placeholderWrapper.classList.add('hidden');
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

// Function to animate the loading field
function refreshData() {
  const calculatorSteps = [
      document.querySelector("#refreshHTSCodes"),
      document.querySelector("#refreshDutyRates"),
      document.querySelector("#refreshFXRates")
  ];

  const refreshTime = document.querySelector("#refreshTime");
  refreshTime.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });

  const removeLoadingClassesFromElementAndDescendants = (element) => {
      element.classList.remove("loading");
      element.classList.remove("loaded");
      const children = element.children;
      for (let i = 0; i < children.length; i++) {
          removeLoadingClassesFromElementAndDescendants(children[i]);
      }
  };

  const addLoadingClassToElementAndDescendants = (element) => {
      element.classList.add("loading");
      const children = element.children;
      for (let i = 0; i < children.length; i++) {
          addLoadingClassToElementAndDescendants(children[i]);
      }
  };

  let i = 0;
  const addLoadingClassToNextStep = () => {
      if (i < calculatorSteps.length) {
          const currentStep = calculatorSteps[i];
          removeLoadingClassesFromElementAndDescendants(currentStep);
          addLoadingClassToElementAndDescendants(currentStep);
          const duration = Math.floor(Math.random() * 500) + 1000; // Generate a random duration between 0.5 and 1.5 seconds
          setTimeout(() => {
              currentStep.classList.remove("loading");
              currentStep.classList.add("loaded");
              const descendants = currentStep.querySelectorAll("*");
              for (let j = 0; j < descendants.length; j++) {
                  descendants[j].classList.remove("loading");
                  descendants[j].classList.add("loaded");
              }
              i++;
              if (i === calculatorSteps.length) {
                  // Reveal the duty rate wrapper
                  const refreshingWrapper = document.querySelector('#refreshingWrapper');
                  refreshingWrapper.classList.add('loaded');
                  const refreshedWrapper = document.querySelector('#refreshedWrapper');
                  refreshedWrapper.classList.add('loaded');
              } else {
                  addLoadingClassToNextStep();
              }
          }, duration);
      }
  };

  addLoadingClassToNextStep();
}

refreshData();