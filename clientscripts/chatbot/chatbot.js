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

    // Function to generate <option> elements from a country list
    const renderCountryOptions = (countryList) => {
        return countryList.map((country) => (
            <option key={country[0]} value={country[0]}>{country[1]}</option>
        ));
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

            const url = new URL('https://www.eagleduty.io/product/hts-codes');
            url.searchParams.append('product', 'chat');
            url.searchParams.append('htsno', selectedItemData.htsno);
            url.searchParams.append('origin', countryOfOrigin);
            url.searchParams.append('importnumber', hasImporterNumber ? 'yes' : 'no');
            url.searchParams.append('value', importValue);

            const uuid = localStorage.getItem('uuid');
            const eventContent = [selectedItemData.htsno, countryOfOrigin, hasImporterNumber ? 'yes' : 'no', importValue].join('; ');

            // Store the htsno and description in session storage
            sessionStorage.setItem("htsno", selectedItemData.htsno);
            sessionStorage.setItem("description", selectedItemData.description);

            fetch('https://eagleduty-magnus1000team.vercel.app/api/website/createAirtableEvent.js', {
                method: 'POST',
                body: JSON.stringify({ uuid, event_content: eventContent }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = url.toString();
                    console.log('Airtable event created successfully');
                } else {
                    console.error('Failed to create Airtable event');
                    // Still perform the redirect even if there's an error
                    window.location.href = url.toString();
                }
            })
            .catch(error => {
                console.error('Error creating Airtable event:', error);
                // Still perform the redirect even if there's an error
                window.location.href = url.toString();
            });
        } else {
            console.error('Invalid chat result or selected item');
        }
    };

    // List of countries
    const countries = [
        ['AF', 'Afghanistan', 'AFN', 'Afghan afghani'],
        ['AL', 'Albania', 'ALL', 'Albanian lek'],
        ['DZ', 'Algeria', 'DZD', 'Algerian dinar'],
        ['AD', 'Andorra', 'EUR', 'Euro'],
        ['AO', 'Angola', 'AOA', 'Angolan kwanza'],
        ['AG', 'Antigua and Barbuda', 'XCD', 'East Caribbean dollar'],
        ['AR', 'Argentina', 'ARS', 'Argentine peso'],
        ['AM', 'Armenia', 'AMD', 'Armenian dram'],
        ['AU', 'Australia', 'AUD', 'Australian dollar'],
        ['AT', 'Austria', 'EUR', 'Euro'],
        ['AZ', 'Azerbaijan', 'AZN', 'Azerbaijani manat'],
        ['BS', 'Bahamas', 'BSD', 'Bahamian dollar'],
        ['BH', 'Bahrain', 'BHD', 'Bahraini dinar'],
        ['BD', 'Bangladesh', 'BDT', 'Bangladeshi taka'],
        ['BB', 'Barbados', 'BBD', 'Barbadian dollar'],
        ['BY', 'Belarus', 'BYN', 'Belarusian ruble'],
        ['BE', 'Belgium', 'EUR', 'Euro'],
        ['BZ', 'Belize', 'BZD', 'Belize dollar'],
        ['BJ', 'Benin', 'XOF', 'West African CFA franc'],
        ['BT', 'Bhutan', 'BTN', 'Bhutanese ngultrum'],
        ['BO', 'Bolivia', 'BOB', 'Bolivian boliviano'],
        ['BA', 'Bosnia and Herzegovina', 'BAM', 'Bosnia and Herzegovina convertible mark'],
        ['BW', 'Botswana', 'BWP', 'Botswana pula'],
        ['BR', 'Brazil', 'BRL', 'Brazilian real'],
        ['BN', 'Brunei', 'BND', 'Brunei dollar'],
        ['BG', 'Bulgaria', 'BGN', 'Bulgarian lev'],
        ['BF', 'Burkina Faso', 'XOF', 'West African CFA franc'],
        ['BI', 'Burundi', 'BIF', 'Burundian franc'],
        ['CV', 'Cabo Verde', 'CVE', 'Cape Verdean escudo'],
        ['KH', 'Cambodia', 'KHR', 'Cambodian riel'],
        ['CM', 'Cameroon', 'XAF', 'Central African CFA franc'],
        ['CA', 'Canada', 'CAD', 'Canadian dollar'],
        ['CF', 'Central African Republic', 'XAF', 'Central African CFA franc'],
        ['TD', 'Chad', 'XAF', 'Central African CFA franc'],
        ['CL', 'Chile', 'CLP', 'Chilean peso'],
        ['CN', 'China', 'CNY', 'Chinese yuan'],
        ['CO', 'Colombia', 'COP', 'Colombian peso'],
        ['KM', 'Comoros', 'KMF', 'Comorian franc'],
        ['CG', 'Congo', 'XAF', 'Central African CFA franc'],
        ['CR', 'Costa Rica', 'CRC', 'Costa Rican colón'],
        ['CI', 'Côte d\'Ivoire', 'XOF', 'West African CFA franc'],
        ['HR', 'Croatia', 'HRK', 'Croatian kuna'],
        ['CU', 'Cuba', 'CUP', 'Cuban peso'],
        ['CY', 'Cyprus', 'EUR', 'Euro'],
        ['CZ', 'Czech Republic', 'CZK', 'Czech koruna'],
        ['DK', 'Denmark', 'DKK', 'Danish krone'],
        ['DJ', 'Djibouti', 'DJF', 'Djiboutian franc'],
        ['DM', 'Dominica', 'XCD', 'East Caribbean dollar'],
        ['DO', 'Dominican Republic', 'DOP', 'Dominican peso'],
        ['EC', 'Ecuador', 'USD', 'United States dollar'],
        ['EG', 'Egypt', 'EGP', 'Egyptian pound'],
        ['SV', 'El Salvador', 'USD', 'United States dollar'],
        ['GQ', 'Equatorial Guinea', 'XAF', 'Central African CFA franc'],
        ['ER', 'Eritrea', 'ERN', 'Eritrean nakfa'],
        ['EE', 'Estonia', 'EUR', 'Euro'],
        ['ET', 'Ethiopia', 'ETB', 'Ethiopian birr'],
        ['FJ', 'Fiji', 'FJD', 'Fijian dollar'],
        ['FI', 'Finland', 'EUR', 'Euro'],
        ['FR', 'France', 'EUR', 'Euro'],
        ['GA', 'Gabon', 'XAF', 'Central African CFA franc'],
        ['GM', 'Gambia', 'GMD', 'Gambian dalasi'],
        ['GE', 'Georgia', 'GEL', 'Georgian lari'],
        ['DE', 'Germany', 'EUR', 'Euro'],
        ['GH', 'Ghana', 'GHS', 'Ghanaian cedi'],
        ['GR', 'Greece', 'EUR', 'Euro'],
        ['GD', 'Grenada', 'XCD', 'East Caribbean dollar'],
        ['GT', 'Guatemala', 'GTQ', 'Guatemalan quetzal'],
        ['GN', 'Guinea', 'GNF', 'Guinean franc'],
        ['GW', 'Guinea-Bissau', 'XOF', 'West African CFA franc'],
        ['GY', 'Guyana', 'GYD', 'Guyanese dollar'],
        ['HT', 'Haiti', 'HTG', 'Haitian gourde'],
        ['HN', 'Honduras', 'HNL', 'Honduran lempira'],
        ['HU', 'Hungary', 'HUF', 'Hungarian forint'],
        ['IS', 'Iceland', 'ISK', 'Icelandic króna'],
        ['IN', 'India', 'INR', 'Indian rupee'],
        ['ID', 'Indonesia', 'IDR', 'Indonesian rupiah'],
        ['IR', 'Iran', 'IRR', 'Iranian rial'],
        ['IQ', 'Iraq', 'IQD', 'Iraqi dinar'],
        ['IE', 'Ireland', 'EUR', 'Euro'],
        ['IL', 'Israel', 'ILS', 'Israeli new shekel'],
        ['IT', 'Italy', 'EUR', 'Euro'],
        ['JM', 'Jamaica', 'JMD', 'Jamaican dollar'],
        ['JP', 'Japan', 'JPY', 'Japanese yen'],
        ['JO', 'Jordan', 'JOD', 'Jordanian dinar'],
        ['KZ', 'Kazakhstan', 'KZT', 'Kazakhstani tenge'],
        ['KE', 'Kenya', 'KES', 'Kenyan shilling'],
        ['KI', 'Kiribati', 'AUD', 'Australian dollar'],
        ['KP', 'North Korea', 'KPW', 'North Korean won'],
        ['KR', 'South Korea', 'KRW', 'South Korean won'],
        ['KW', 'Kuwait', 'KWD', 'Kuwaiti dinar'],
        ['KG', 'Kyrgyzstan', 'KGS', 'Kyrgyzstani som'],
        ['LA', 'Laos', 'LAK', 'Lao kip'],
        ['LV', 'Latvia', 'EUR', 'Euro'],
        ['LB', 'Lebanon', 'LBP', 'Lebanese pound'],
        ['LS', 'Lesotho', 'LSL', 'Lesotho loti'],
        ['LR', 'Liberia', 'LRD', 'Liberian dollar'],
        ['LY', 'Libya', 'LYD', 'Libyan dinar'],
        ['LI', 'Liechtenstein', 'CHF', 'Swiss franc'],
        ['LT', 'Lithuania', 'EUR', 'Euro'],
        ['LU', 'Luxembourg', 'EUR', 'Euro'],
        ['MG', 'Madagascar', 'MGA', 'Malagasy ariary'],
        ['MW', 'Malawi', 'MWK', 'Malawian kwacha'],
        ['MY', 'Malaysia', 'MYR', 'Malaysian ringgit'],
        ['MV', 'Maldives', 'MVR', 'Maldivian rufiyaa'],
        ['ML', 'Mali', 'XOF', 'West African CFA franc'],
        ['MT', 'Malta', 'EUR', 'Euro'],
        ['MH', 'Marshall Islands', 'USD', 'United States dollar'],
        ['MR', 'Mauritania', 'MRU', 'Mauritanian ouguiya'],
        ['MU', 'Mauritius', 'MUR', 'Mauritian rupee'],
        ['MX', 'Mexico', 'MXN', 'Mexican peso'],
        ['FM', 'Micronesia', 'USD', 'United States dollar'],
        ['MD', 'Moldova', 'MDL', 'Moldovan leu'],
        ['MC', 'Monaco', 'EUR', 'Euro'],
        ['MN', 'Mongolia', 'MNT', 'Mongolian tögrög'],
        ['ME', 'Montenegro', 'EUR', 'Euro'],
        ['MA', 'Morocco', 'MAD', 'Moroccan dirham'],
        ['MZ', 'Mozambique', 'MZN', 'Mozambican metical'],
        ['MM', 'Myanmar', 'MMK', 'Burmese kyat'],
        ['NA', 'Namibia', 'NAD', 'Namibian dollar'],
        ['NR', 'Nauru', 'AUD', 'Australian dollar'],
        ['NP', 'Nepal', 'NPR', 'Nepalese rupee'],
        ['NL', 'Netherlands', 'EUR', 'Euro'],
        ['NZ', 'New Zealand', 'NZD', 'New Zealand dollar'],
        ['NI', 'Nicaragua', 'NIO', 'Nicaraguan córdoba'],
        ['NE', 'Niger', 'XOF', 'West African CFA franc'],
        ['NG', 'Nigeria', 'NGN', 'Nigerian naira'],
        ['MP', 'Northern Mariana Islands', 'USD', 'United States dollar'],
        ['NO', 'Norway', 'NOK', 'Norwegian krone'],
        ['OM', 'Oman', 'OMR', 'Omani rial'],
        ['PK', 'Pakistan', 'PKR', 'Pakistani rupee'],
        ['PW', 'Palau', 'USD', 'United States dollar'],
        ['PA', 'Panama', 'PAB', 'Panamanian balboa'],
        ['PG', 'Papua New Guinea', 'PGK', 'Papua New Guinean kina'],
        ['PY', 'Paraguay', 'PYG', 'Paraguayan guaraní'],
        ['PE', 'Peru', 'PEN', 'Peruvian sol'],
        ['PH', 'Philippines', 'PHP', 'Philippine peso'],
        ['PL', 'Poland', 'PLN', 'Polish złoty'],
        ['PT', 'Portugal', 'EUR', 'Euro'],
        ['PR', 'Puerto Rico', 'USD', 'United States dollar'],
        ['QA', 'Qatar', 'QAR', 'Qatari riyal'],
        ['RO', 'Romania', 'RON', 'Romanian leu'],
        ['RU', 'Russia', 'RUB', 'Russian ruble'],
        ['RW', 'Rwanda', 'RWF', 'Rwandan franc'],
        ['KN', 'Saint Kitts and Nevis', 'XCD', 'East Caribbean dollar'],
        ['LC', 'Saint Lucia', 'XCD', 'East Caribbean dollar'],
        ['VC', 'Saint Vincent and the Grenadines', 'XCD', 'East Caribbean dollar'],
        ['WS', 'Samoa', 'WST', 'Samoan tālā'],
        ['SM', 'San Marino', 'EUR', 'Euro'],
        ['ST', 'São Tomé and Príncipe', 'STN', 'São Tomé and Príncipe dobra'],
        ['SA', 'Saudi Arabia', 'SAR', 'Saudi riyal'],
        ['SN', 'Senegal', 'XOF', 'West African CFA franc'],
        ['RS', 'Serbia', 'RSD', 'Serbian dinar'],
        ['SC', 'Seychelles', 'SCR', 'Seychellois rupee'],
        ['SL', 'Sierra Leone', 'SLL', 'Sierra Leonean leone'],
        ['SG', 'Singapore', 'SGD', 'Singapore dollar'],
        ['SK', 'Slovakia', 'EUR', 'Euro'],
        ['SI', 'Slovenia', 'EUR', 'Euro'],
        ['SB', 'Solomon Islands', 'SBD', 'Solomon Islands dollar'],
        ['SO', 'Somalia', 'SOS', 'Somali shilling'],
        ['ZA', 'South Africa', 'ZAR', 'South African rand'],
        ['SS', 'South Sudan', 'SSP', 'South Sudanese pound'],
        ['ES', 'Spain', 'EUR', 'Euro'],
        ['LK', 'Sri Lanka', 'LKR', 'Sri Lankan rupee'],
        ['SD', 'Sudan', 'SDG', 'Sudanese pound'],
        ['SR', 'Suriname', 'SRD', 'Surinamese dollar'],
        ['SE', 'Sweden', 'SEK', 'Swedish krona'],
        ['CH', 'Switzerland', 'CHF', 'Swiss franc'],
        ['SY', 'Syria', 'SYP', 'Syrian pound'],
        ['TW', 'Taiwan', 'TWD', 'New Taiwan dollar'],
        ['TJ', 'Tajikistan', 'TJS', 'Tajikistani somoni'],
        ['TZ', 'Tanzania', 'TZS', 'Tanzanian shilling'],
        ['TH', 'Thailand', 'THB', 'Thai baht'],
        ['TL', 'Timor-Leste', 'USD', 'United States dollar'],
        ['TG', 'Togo', 'XOF', 'West African CFA franc'],
        ['TO', 'Tonga', 'TOP', 'Tongan paʻanga'],
        ['TT', 'Trinidad and Tobago', 'TTD', 'Trinidad and Tobago dollar'],
        ['TN', 'Tunisia', 'TND', 'Tunisian dinar'],
        ['TR', 'Turkey', 'TRY', 'Turkish lira'],
        ['TM', 'Turkmenistan', 'TMT', 'Turkmenistan manat'],
        ['TV', 'Tuvalu', 'AUD', 'Australian dollar'],
        ['UG', 'Uganda', 'UGX', 'Ugandan shilling'],
        ['UA', 'Ukraine', 'UAH', 'Ukrainian hryvnia'],
        ['AE', 'United Arab Emirates', 'AED', 'United Arab Emirates dirham'],
        ['GB', 'United Kingdom', 'GBP', 'Pound sterling'],
        ['US', 'United States', 'USD', 'United States dollar'],
        ['UY', 'Uruguay', 'UYU', 'Uruguayan peso'],
        ['UZ', 'Uzbekistan', 'UZS', 'Uzbekistani soʻm'],
        ['VU', 'Vanuatu', 'VUV', 'Vanuatu vatu'],
        ['VA', 'Vatican City', 'EUR', 'Euro'],
        ['VE', 'Venezuela', 'VES', 'Venezuelan bolívar soberano'],
        ['VN', 'Vietnam', 'VND', 'Vietnamese đồng'],
        ['YE', 'Yemen', 'YER', 'Yemeni rial'],
        ['ZM', 'Zambia', 'ZMW', 'Zambian kwacha'],
        ['ZW', 'Zimbabwe', 'ZWL', 'Zimbabwean dollar']
    ];
    
    // List of priority countries
    const shortCountryList = [
        ['CA', 'Canada', 'CAD', 'Canadian dollar'],
        ['CN', 'China', 'CNY', 'Chinese yuan'],
        ['DE', 'Germany', 'EUR', 'Euro'],
        ['ID', 'Indonesia', 'IDR', 'Indonesian rupiah'],
        ['JP', 'Japan', 'JPY', 'Japanese yen'],
        ['MX', 'Mexico', 'MXN', 'Mexican peso'],
        ['VN', 'Vietnam', 'VND', 'Vietnamese dong']
    ];
    

    return (
        <div className="chat-form-wrapper">
            <h2>Import Considerations</h2>
            <p>See duty rates, applicable penalties, free trade agreements and maximum quantities for this product</p>
            <div className="chat-form">
                <div className="button-group-wrapper">
                    <label htmlFor="countryOfOrigin">Country of Origin</label>
                    <select className="input-field w-select" id="countryOfOrigin" name="countryOfOrigin" value={countryOfOrigin} onChange={handleCountryOfOriginChange}>
                        {renderCountryOptions(shortCountryList)}
                        <option disabled>──────────</option>
                        {renderCountryOptions(countries)}
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

function ErrorComponent({ errorMessage, onRetry }) {
    return (
        <div className="error-component" role="alert">
            <p>{errorMessage}</p>
            {onRetry && (
                <button onClick={onRetry} aria-label="Retry request">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="currentColor" d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                </button>
            )}
        </div>
    );
}

function ChatComponent() {
    const [inputText, setInputText] = React.useState('');
    const [chatResults, setChatResults] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false); // Error state
    const isButtonDisabled = inputText.length < 10 || isLoading;
    const chatSearchRef = React.useRef(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        console.log('Loading div revealed');
        setChatResults([]);
        setIsLoading(true);
        setSelectedItem(null);
        setError(false); // Reset showError state
        const uuid = localStorage.getItem('uuid');
        sessionStorage.setItem("query", inputText);
        fetch('https://hook.us1.make.com/hx1aw3ym6zmstgfresiudsxv8d8y9t2c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_description: inputText, uuid }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Webhook request failed');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Response:', data);
                if (data.length === 0) {
                    throw new Error('No results found');
                }
                setChatResults(data);
            })
        .catch((error) => {
            console.error('Error:', error);
            let message;
            if (error.message === 'Webhook request failed') {
                message = 'An error occurred while processing your request. Please try again later.';
            } else if (error.message === 'No results found') {
                message = 'No results found for your query.';
                // In this case, we don't want to provide a retry option
                setError(message);
                return;
            } else {
                message = 'An unknown error occurred.';
            }
            // Set the error message and provide a retry function
            setError(message);
            setRetryFunction(() => handleSend);
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
            {error && (
                <ErrorComponent
                    errorMessage={error} 
                    onRetry={handleSend} 
                />
            )}
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