function ImportForm({ chatResults, selectedItem, setChatResults }) {
    const [countryOfOrigin, setCountryOfOrigin] = React.useState('china');
    const [importValue, setImportValue] = React.useState('');
    const [hasImporterNumber, setHasImporterNumber] = React.useState(null);
    const [isFormComplete, setIsFormComplete] = React.useState(false); // Track the form completion status

    const handleCountryOfOriginChange = (event) => {
        setCountryOfOrigin(event.target.value);
    };

    const handleImportValueChange = (value) => {
        setImportValue(value);
    };

    const handleHasImporterNumberChange = (value) => {
        setHasImporterNumber(value);
    };

    const clearSearch = () => {
        setChatResults({});
        setSelectedItem(null);
    };

    React.useEffect(() => {
        // Check if all form fields are selected
        if (countryOfOrigin && importValue && hasImporterNumber !== null) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [countryOfOrigin, importValue, hasImporterNumber]);

    const handleFormSubmit = () => {
        // Ensure that chatResults and selectedItem are defined and valid
        if (chatResults && selectedItem != null && chatResults[selectedItem]) {
            const selectedItemData = chatResults[selectedItem];
    
            const url = new URL('https://www.eagleduty.io');
            url.searchParams.append('htsno', selectedItemData.htsno);
            url.searchParams.append('origin', countryOfOrigin);
            url.searchParams.append('importnumber', hasImporterNumber ? 'yes' : 'no');
            url.searchParams.append('value', importValue);
    
            window.location.href = url.toString();
        } else {
            console.error('Invalid chat result or selected item');
        }
    };
    

    return (
        <div className="chat-form-wrapper">
            <h2>Import Considerations</h2>
            <p>See duty rates, applicable penalties, free trade agreements and maximum quantities for this product</p>
            <div className="chat-form">
                <div className="button-group-wrapper">
                    <label htmlFor="countryOfOrigin">Country of Origin</label>
                    <select className="input-field w-select" id="countryOfOrigin" name="countryOfOrigin" value={countryOfOrigin} onChange={handleCountryOfOriginChange}>
                        <option value="china">China</option>
                        {/* Add more options here */}
                    </select>
                </div>
                <div className="button-group-wrapper">
                    <label>Total value of import</label>
                    <div className="button-group">
                        <button className={`button-primary ${importValue === 'under2500' ? 'selected' : ''}`} onClick={() => handleImportValueChange('under2500')}>Under $2500</button>
                        <button className={`button-primary ${importValue === '2500to10000' ? 'selected' : ''}`} onClick={() => handleImportValueChange('2500to10000')}>$2,500 - $10,000</button>
                        <button className={`button-primary ${importValue === '10000to100000' ? 'selected' : ''}`} onClick={() => handleImportValueChange('10000to100000')}>$10,000 - $100K</button>
                        <button className={`button-primary ${importValue === '100000plus' ? 'selected' : ''}`} onClick={() => handleImportValueChange('100000plus')}>$100K+</button>
                    </div>
                </div>
                <div className="button-group-wrapper">
                    <label>Do you have an Importer Number?</label>
                    <div className="button-group">
                        <button className={`button-primary ${hasImporterNumber === true ? 'selected' : ''}`} onClick={() => handleHasImporterNumberChange(true)}>Yes</button>
                        <button className={`button-primary ${hasImporterNumber === false ? 'selected' : ''}`} onClick={() => handleHasImporterNumberChange(false)}>No</button>
                    </div>
                </div>
            </div>
            <div className="button-wrapper">
                <button className="button-primary-blue" disabled={!isFormComplete} onClick={() => handleFormSubmit(selectedItem)}>
                    See considerations
                </button>
                <button className="button-no-border" onClick={clearSearch}>
                    Start again
                </button>
            </div>
        </div>
    );
}

function ChatComponent() {
    const [inputText, setInputText] = React.useState('');
    const [chatResults, setChatResults] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null); // Track the selected item
    const [isLoading, setIsLoading] = React.useState(false);
    const isButtonDisabled = inputText.length < 10 || isLoading;
    const chatSearchRef = React.useRef(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        console.log('Loading div revealed'); // Add log statement
        setChatResults([]); // Clear the chat results
        setIsLoading(true);
        setSelectedItem(null); // Clear the selected item
        const uuid = localStorage.getItem('uuid');
        fetch('https://hook.us1.make.com/hx1aw3ym6zmstgfresiudsxv8d8y9t2c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_description: inputText, uuid }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response:', data);
            setChatResults(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            handleSend(); // Call handleSend function when Enter is pressed without Ctrl key
        }
    };

    const handleSelectItem = (index) => {
        setSelectedItem(index); // Set the selected item index
    };

    React.useEffect(() => {
        chatSearchRef.current.focus();
    }, []);

    console.log('Rendering ChatComponent');

    return (
        <div id="chatWrapper">
            <div className="chat-input-button-wrapper">
                <textarea
                    id="chatSearch"
                    className="text-area-input-absolute"
                    value={inputText}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    onKeyDown={handleKeyDown} // Add onKeyDown event handler
                    ref={chatSearchRef}
                    placeholder="Describe your product..."
                />
                <div className="chat-div-button-div">
                    <button
                        id="chatSubmit"
                        className="chat-button"
                        onClick={handleSend}
                        disabled={isButtonDisabled}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M133.9 232L65.8 95.9 383.4 232H133.9zm0 48H383.4L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {isLoading && (
                <div className="loading-div">
                    <div className="loading-content">
                        <dotlottie-player
                            src="https://lottie.host/bbfcd041-2847-455d-b639-8b01f3a12e5a/vkgdwrUSFL.json"
                            background="transparent"
                            speed="1"
                            style={{ width: '100px', height: '100px' }}
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                </div>
            )}
            <div id="chatResults" className="chat-results">
                {chatResults.map((result, index) => (
                    <div
                        key={index}
                        className={`chat-result-item ${selectedItem === index ? 'selected' : ''}`} // Apply 'selected' class if the item is selected
                        onClick={() => handleSelectItem(index)} // Handle item selection
                    >
                        <div className={`checked-result-circle ${selectedItem === index ? 'selected' : ''}`} /> 
                        <div className="result-header">
                            <p className="hts-code">
                                {result.htsno} - <span dangerouslySetInnerHTML={{ __html: result.description }}></span>
                            </p>
                        </div>
                        <div className="result-details">
                            <div className="section">
                                <p className="section-name">{result.section_name}</p>
                                <p className="section-description">{result.section_description}</p>
                            </div>
                            <div className="chapter">
                                <p className="chapter-name">{result.chapter_name}</p>
                                <p className="chapter-description">{result.chapter_description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Conditionally render the ImportForm component if an item is selected */}
            {selectedItem !== null && <ImportForm chatResults={chatResults} selectedItem={selectedItem} />}
        </div>
    );
}

console.log('Rendering ReactDOM');

ReactDOM.render(React.createElement(ChatComponent), document.getElementById('root'));