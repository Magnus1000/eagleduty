function addRadioEventListener() {
    const radiosContainer = document.querySelector("#resultsColumn");

    radiosContainer.addEventListener("click", (event) => {
        const clickedRadio = event.target;

        if (clickedRadio.classList.contains("result-radio")) {
            const radios = radiosContainer.querySelectorAll(".result-radio");

            radios.forEach((radio) => {
                if (radio !== clickedRadio) {
                    radio.checked = false;
                    radio.classList.remove("checked");
                }
            });

            if (clickedRadio.checked) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set("htsno", clickedRadio.value);
                window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
                clickedRadio.classList.add("checked");
            } else {
                clickedRadio.classList.remove("checked");
            }
        }
    });
}

// Function to hide step 1 and show step 2
function goStep2() {
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");

    console.log("gridStep1Wrapper:", gridStep1Wrapper);
    console.log("gridStep2Wrapper:", gridStep2Wrapper);

    gridStep1Wrapper.style.display = "none";
    gridStep2Wrapper.style.display = "flex";

    const selectedResult = document.querySelector(".result-radio.checked").parentNode;
    const htsno = selectedResult.getAttribute("data-htsno");
    const description = selectedResult.getAttribute("data-description");
    const chapterDescription = selectedResult.getAttribute("data-chapter-description");
    const sectionDescription = selectedResult.getAttribute("data-section-description");
    const chapter = selectedResult.getAttribute("data-chapter-name");
    const section = selectedResult.getAttribute("data-section-name");

    console.log("selectedResult:", selectedResult);
    console.log("htsno:", htsno);
    console.log("description:", description);
    console.log("chapterDescription:", chapterDescription);
    console.log("sectionDescription:", sectionDescription);
    console.log("chapter:", chapter);
    console.log("section:", section);

    const selectedResultCard = document.querySelector("#selectedResult");
    console.log("selectedResultCard:", selectedResultCard);
    selectedResultCard.querySelector("[data-hts-card='htsno']").textContent = htsno;
    selectedResultCard.querySelector("[data-hts-card='description']").textContent = description;
    selectedResultCard.querySelector("[data-hts-card='chapter-description']").textContent = chapterDescription;
    selectedResultCard.querySelector("[data-hts-card='section-description']").textContent = sectionDescription;
    selectedResultCard.querySelector("[data-hts-card='chapter']").textContent = chapter;
    selectedResultCard.querySelector("[data-hts-card='section']").textContent = section;
}

// Function to hide step 2 and show step 1
function backStep1() {
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");

    gridStep1Wrapper.style.display = "flex";
    gridStep2Wrapper.style.display = "none";
}

// Function to set the selected option in a dropdown
function setSelectedOption(selectId, valueToSelect) {
    const select = document.getElementById(selectId);
    console.log("Found element:", select);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === valueToSelect) {
            select.selectedIndex = i;
            console.log("Set selected index to:", i);
            break;
        }
    }
    console.log("Selected option:", select.options[select.selectedIndex].text);
}

const countries = [
    ['AFG', 'Afghanistan', 'AFN', 'Afghan afghani'],
    ['ALB', 'Albania', 'ALL', 'Albanian lek'],
    ['DZA', 'Algeria', 'DZD', 'Algerian dinar'],
    ['AND', 'Andorra', 'EUR', 'Euro'],
    ['AGO', 'Angola', 'AOA', 'Angolan kwanza'],
    ['ATG', 'Antigua and Barbuda', 'XCD', 'East Caribbean dollar'],
    ['ARG', 'Argentina', 'ARS', 'Argentine peso'],
    ['ARM', 'Armenia', 'AMD', 'Armenian dram'],
    ['AUS', 'Australia', 'AUD', 'Australian dollar'],
    ['AUT', 'Austria', 'EUR', 'Euro'],
    ['AZE', 'Azerbaijan', 'AZN', 'Azerbaijani manat'],
    ['BHS', 'Bahamas', 'BSD', 'Bahamian dollar'],
    ['BHR', 'Bahrain', 'BHD', 'Bahraini dinar'],
    ['BGD', 'Bangladesh', 'BDT', 'Bangladeshi taka'],
    ['BRB', 'Barbados', 'BBD', 'Barbadian dollar'],
    ['BLR', 'Belarus', 'BYN', 'Belarusian ruble'],
    ['BEL', 'Belgium', 'EUR', 'Euro'],
    ['BLZ', 'Belize', 'BZD', 'Belize dollar'],
    ['BEN', 'Benin', 'XOF', 'West African CFA franc'],
    ['BTN', 'Bhutan', 'BTN', 'Bhutanese ngultrum'],
    ['BOL', 'Bolivia', 'BOB', 'Bolivian boliviano'],
    ['BIH', 'Bosnia and Herzegovina', 'BAM', 'Bosnia and Herzegovina convertible mark'],
    ['BWA', 'Botswana', 'BWP', 'Botswana pula'],
    ['BRA', 'Brazil', 'BRL', 'Brazilian real'],
    ['BRN', 'Brunei', 'BND', 'Brunei dollar'],
    ['BGR', 'Bulgaria', 'BGN', 'Bulgarian lev'],
    ['BFA', 'Burkina Faso', 'XOF', 'West African CFA franc'],
    ['BDI', 'Burundi', 'BIF', 'Burundian franc'],
    ['CPV', 'Cabo Verde', 'CVE', 'Cape Verdean escudo'],
    ['KHM', 'Cambodia', 'KHR', 'Cambodian riel'],
    ['CMR', 'Cameroon', 'XAF', 'Central African CFA franc'],
    ['CAN', 'Canada', 'CAD', 'Canadian dollar'],
    ['CAF', 'Central African Republic', 'XAF', 'Central African CFA franc'],
    ['TCD', 'Chad', 'XAF', 'Central African CFA franc'],
    ['CHL', 'Chile', 'CLP', 'Chilean peso'],
    ['CHN', 'China', 'CNY', 'Chinese yuan'],
    ['COL', 'Colombia', 'COP', 'Colombian peso'],
    ['COM', 'Comoros', 'KMF', 'Comorian franc'],
    ['COG', 'Congo', 'XAF', 'Central African CFA franc'],
    ['CRI', 'Costa Rica', 'CRC', 'Costa Rican colón'],
    ['CIV', 'Côte d\'Ivoire', 'XOF', 'West African CFA franc'],
    ['HRV', 'Croatia', 'HRK', 'Croatian kuna'],
    ['CUB', 'Cuba', 'CUP', 'Cuban peso'],
    ['CYP', 'Cyprus', 'EUR', 'Euro'],
    ['CZE', 'Czech Republic', 'CZK', 'Czech koruna'],
    ['DNK', 'Denmark', 'DKK', 'Danish krone'],
    ['DJI', 'Djibouti', 'DJF', 'Djiboutian franc'],
    ['DMA', 'Dominica', 'XCD', 'East Caribbean dollar'],
    ['DOM', 'Dominican Republic', 'DOP', 'Dominican peso'],
    ['ECU', 'Ecuador', 'USD', 'United States dollar'],
    ['EGY', 'Egypt', 'EGP', 'Egyptian pound'],
    ['SLV', 'El Salvador', 'USD', 'United States dollar'],
    ['GNQ', 'Equatorial Guinea', 'XAF', 'Central African CFA franc'],
    ['ERI', 'Eritrea', 'ERN', 'Eritrean nakfa'],
    ['EST', 'Estonia', 'EUR', 'Euro'],
    ['ETH', 'Ethiopia', 'ETB', 'Ethiopian birr'],
    ['FJI', 'Fiji', 'FJD', 'Fijian dollar'],
    ['FIN', 'Finland', 'EUR', 'Euro'],
    ['FRA', 'France', 'EUR', 'Euro'],
    ['GAB', 'Gabon', 'XAF', 'Central African CFA franc'],
    ['GMB', 'Gambia', 'GMD', 'Gambian dalasi'],
    ['GEO', 'Georgia', 'GEL', 'Georgian lari'],
    ['DEU', 'Germany', 'EUR', 'Euro'],
    ['GHA', 'Ghana', 'GHS', 'Ghanaian cedi'],
    ['GRC', 'Greece', 'EUR', 'Euro'],
    ['GRD', 'Grenada', 'XCD', 'East Caribbean dollar'],
    ['GTM', 'Guatemala', 'GTQ', 'Guatemalan quetzal'],
    ['GIN', 'Guinea', 'GNF', 'Guinean franc'],
    ['GNB', 'Guinea-Bissau', 'XOF', 'West African CFA franc'],
    ['GUY', 'Guyana', 'GYD', 'Guyanese dollar'],
    ['HTI', 'Haiti', 'HTG', 'Haitian gourde'],
    ['HND', 'Honduras', 'HNL', 'Honduran lempira'],
    ['HUN', 'Hungary', 'HUF', 'Hungarian forint'],
    ['ISL', 'Iceland', 'ISK', 'Icelandic króna'],
    ['IND', 'India', 'INR', 'Indian rupee'],
    ['IDN', 'Indonesia', 'IDR', 'Indonesian rupiah'],
    ['IRN', 'Iran', 'IRR', 'Iranian rial'],
    ['IRQ', 'Iraq', 'IQD', 'Iraqi dinar'],
    ['IRL', 'Ireland', 'EUR', 'Euro'],
    ['ISR', 'Israel', 'ILS', 'Israeli new shekel'],
    ['ITA', 'Italy', 'EUR', 'Euro'],
    ['JAM', 'Jamaica', 'JMD', 'Jamaican dollar'],
    ['JPN', 'Japan', 'JPY', 'Japanese yen'],
    ['JOR', 'Jordan', 'JOD', 'Jordanian dinar'],
    ['KAZ', 'Kazakhstan', 'KZT', 'Kazakhstani tenge'],
    ['KEN', 'Kenya', 'KES', 'Kenyan shilling'],
    ['KIR', 'Kiribati', 'AUD', 'Australian dollar'],
    ['PRK', 'North Korea', 'KPW', 'North Korean won'],
    ['KOR', 'South Korea', 'KRW', 'South Korean won'],
    ['KWT', 'Kuwait', 'KWD', 'Kuwaiti dinar'],
    ['KGZ', 'Kyrgyzstan', 'KGS', 'Kyrgyzstani som'],
    ['LAO', 'Laos', 'LAK', 'Lao kip'],
    ['LVA', 'Latvia', 'EUR', 'Euro'],
    ['LBN', 'Lebanon', 'LBP', 'Lebanese pound'],
    ['LSO', 'Lesotho', 'LSL', 'Lesotho loti'],
    ['LBR', 'Liberia', 'LRD', 'Liberian dollar'],
    ['LBY', 'Libya', 'LYD', 'Libyan dinar'],
    ['LIE', 'Liechtenstein', 'CHF', 'Swiss franc'],
    ['LTU', 'Lithuania', 'EUR', 'Euro'],
    ['LUX', 'Luxembourg', 'EUR', 'Euro'],
    ['MDG', 'Madagascar', 'MGA', 'Malagasy ariary'],
    ['MWI', 'Malawi', 'MWK', 'Malawian kwacha'],
    ['MYS', 'Malaysia', 'MYR', 'Malaysian ringgit'],
    ['MDV', 'Maldives', 'MVR', 'Maldivian rufiyaa'],
    ['MLI', 'Mali', 'XOF', 'West African CFA franc'],
    ['MLT', 'Malta', 'EUR', 'Euro'],
    ['MHL', 'Marshall Islands', 'USD', 'United States dollar'],
    ['MRT', 'Mauritania', 'MRU', 'Mauritanian ouguiya'],
    ['MUS', 'Mauritius', 'MUR', 'Mauritian rupee'],
    ['MEX', 'Mexico', 'MXN', 'Mexican peso'],
    ['FSM', 'Micronesia', 'USD', 'United States dollar'],
    ['MDA', 'Moldova', 'MDL', 'Moldovan leu'],
    ['MCO', 'Monaco', 'EUR', 'Euro'],
    ['MNG', 'Mongolia', 'MNT', 'Mongolian tögrög'],
    ['MNE', 'Montenegro', 'EUR', 'Euro'],
    ['MAR', 'Morocco', 'MAD', 'Moroccan dirham'],
    ['MOZ', 'Mozambique', 'MZN', 'Mozambican metical'],
    ['MMR', 'Myanmar', 'MMK', 'Burmese kyat'],
    ['NAM', 'Namibia', 'NAD', 'Namibian dollar'],
    ['NRU', 'Nauru', 'AUD', 'Australian dollar'],
    ['NPL', 'Nepal', 'NPR', 'Nepalese rupee'],
    ['NLD', 'Netherlands', 'EUR', 'Euro'],
    ['NZL', 'New Zealand', 'NZD', 'New Zealand dollar'],
    ['NIC', 'Nicaragua', 'NIO', 'Nicaraguan córdoba'],
    ['NER', 'Niger', 'XOF', 'West African CFA franc'],
    ['NGA', 'Nigeria', 'NGN', 'Nigerian naira'],
    ['MNP', 'Northern Mariana Islands', 'USD', 'United States dollar'],
    ['NOR', 'Norway', 'NOK', 'Norwegian krone'],
    ['OMN', 'Oman', 'OMR', 'Omani rial'],
    ['PAK', 'Pakistan', 'PKR', 'Pakistani rupee'],
    ['PLW', 'Palau', 'USD', 'United States dollar'],
    ['PAN', 'Panama', 'PAB', 'Panamanian balboa'],
    ['PNG', 'Papua New Guinea', 'PGK', 'Papua New Guinean kina'],
    ['PRY', 'Paraguay', 'PYG', 'Paraguayan guaraní'],
    ['PER', 'Peru', 'PEN', 'Peruvian sol'],
    ['PHL', 'Philippines', 'PHP', 'Philippine peso'],
    ['POL', 'Poland', 'PLN', 'Polish złoty'],
    ['PRT', 'Portugal', 'EUR', 'Euro'],
    ['PRI', 'Puerto Rico', 'USD', 'United States dollar'],
    ['QAT', 'Qatar', 'QAR', 'Qatari riyal'],
    ['ROU', 'Romania', 'RON', 'Romanian leu'],
    ['RUS', 'Russia', 'RUB', 'Russian ruble'],
    ['RWA', 'Rwanda', 'RWF', 'Rwandan franc'],
    ['KNA', 'Saint Kitts and Nevis', 'XCD', 'East Caribbean dollar'],
    ['LCA', 'Saint Lucia', 'XCD', 'East Caribbean dollar'],
    ['VCT', 'Saint Vincent and the Grenadines', 'XCD', 'East Caribbean dollar'],
    ['WSM', 'Samoa', 'WST', 'Samoan tālā'],
    ['SMR', 'San Marino', 'EUR', 'Euro'],
    ['STP', 'São Tomé and Príncipe', 'STN', 'São Tomé and Príncipe dobra'],
    ['SAU', 'Saudi Arabia', 'SAR', 'Saudi riyal'],
    ['SEN', 'Senegal', 'XOF', 'West African CFA franc'],
    ['SRB', 'Serbia', 'RSD', 'Serbian dinar'],
    ['SYC', 'Seychelles', 'SCR', 'Seychellois rupee'],
    ['SLE', 'Sierra Leone', 'SLL', 'Sierra Leonean leone'],
    ['SGP', 'Singapore', 'SGD', 'Singapore dollar'],
    ['SVK', 'Slovakia', 'EUR', 'Euro'],
    ['SVN', 'Slovenia', 'EUR', 'Euro'],
    ['SLB', 'Solomon Islands', 'SBD', 'Solomon Islands dollar'],
    ['SOM', 'Somalia', 'SOS', 'Somali shilling'],
    ['ZAF', 'South Africa', 'ZAR', 'South African rand'],
    ['SSD', 'South Sudan', 'SSP', 'South Sudanese pound'],
    ['ESP', 'Spain', 'EUR', 'Euro'],
    ['LKA', 'Sri Lanka', 'LKR', 'Sri Lankan rupee'],
    ['SDN', 'Sudan', 'SDG', 'Sudanese pound'],
    ['SUR', 'Suriname', 'SRD', 'Surinamese dollar'],
    ['SWE', 'Sweden', 'SEK', 'Swedish krona'],
    ['CHE', 'Switzerland', 'CHF', 'Swiss franc'],
    ['SYR', 'Syria', 'SYP', 'Syrian pound'],
    ['TWN', 'Taiwan', 'TWD', 'New Taiwan dollar'],
    ['TJK', 'Tajikistan', 'TJS', 'Tajikistani somoni'],
    ['TZA', 'Tanzania', 'TZS', 'Tanzanian shilling'],
    ['THA', 'Thailand', 'THB', 'Thai baht'],
    ['TLS', 'Timor-Leste', 'USD', 'United States dollar'],
    ['TGO', 'Togo', 'XOF', 'West African CFA franc'],
    ['TON', 'Tonga', 'TOP', 'Tongan paʻanga'],
    ['TTO', 'Trinidad and Tobago', 'TTD', 'Trinidad and Tobago dollar'],
    ['TUN', 'Tunisia', 'TND', 'Tunisian dinar'],
    ['TUR', 'Turkey', 'TRY', 'Turkish lira'],
    ['TKM', 'Turkmenistan', 'TMT', 'Turkmenistan manat'],
    ['TUV', 'Tuvalu', 'AUD', 'Australian dollar'],
    ['UGA', 'Uganda', 'UGX', 'Ugandan shilling'],
    ['UKR', 'Ukraine', 'UAH', 'Ukrainian hryvnia'],
    ['ARE', 'United Arab Emirates', 'AED', 'United Arab Emirates dirham'],
    ['GBR', 'United Kingdom', 'GBP', 'Pound sterling'],
    ['USA', 'United States', 'USD', 'United States dollar'],
    ['URY', 'Uruguay', 'UYU', 'Uruguayan peso'],
    ['UZB', 'Uzbekistan', 'UZS', 'Uzbekistani soʻm'],
    ['VUT', 'Vanuatu', 'VUV', 'Vanuatu vatu'],
    ['VAT', 'Vatican City', 'EUR', 'Euro'],
    ['VEN', 'Venezuela', 'VES', 'Venezuelan bolívar soberano'],
    ['VNM', 'Vietnam', 'VND', 'Vietnamese đồng'],
    ['YEM', 'Yemen', 'YER', 'Yemeni rial'],
    ['ZMB', 'Zambia', 'ZMW', 'Zambian kwacha'],
    ['ZWE', 'Zimbabwe', 'ZWL', 'Zimbabwean dollar']
];

function createDropdownOptions() {
    const importingToSelect = document.getElementById('ImportingTo');
    const importingToCurrencySelect = document.getElementById('ImportingToCurrency');
    for (let i = 0; i < countries.length; i++) {
        const option = document.createElement('option');
        option.value = countries[i][1];
        option.text = countries[i][1];
        importingToSelect.add(option);

        const currencyOption = document.createElement('option');
        currencyOption.value = countries[i][3];
        currencyOption.text = countries[i][3];
        importingToCurrencySelect.add(currencyOption);
    }
}

// Function to get the user's location from their IP address
function getUserLocation() {
    fetch('https://ipapi.co/json/')
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error('Could not fetch location data');
        }
    })
    .then(data => {
        // Assuming the API returns an object with "country_name" and "currency" properties
        setSelectedOption('importingTo', data.country_name);
        setSelectedOption('importingToCurrency', data.currency);
        console.log('Success:', data.country_name, data.currency);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.addEventListener("load", () => {
    addRadioEventListener();

    const nextStep1Button = document.querySelector("#nextStep1");
    nextStep1Button.addEventListener("click", goStep2);

    const backStep1Button = document.querySelector("#backStep1");
    backStep1Button.addEventListener("click", backStep1);

    createDropdownOptions();
    getUserLocation();
});