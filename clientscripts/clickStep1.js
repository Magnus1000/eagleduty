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

// Animate the arrow to expand to the right
function animateArrow(id, direction) {
    const arrowWrapper = document.querySelector(`#${id}`);
    let width = direction === "forward" ? 0 : 100;
    let speed = 1;
    const maxSpeed = 10;
    const intervalTime = 20;
    const maxWidth = 100;

    const interval = setInterval(() => {
        if (direction === "forward") {
            width += speed;
        } else {
            width -= speed;
        }
        arrowWrapper.style.width = `${width}%`;

        if (direction === "forward" && width >= maxWidth) {
            speed = Math.max(speed - 1, 1);
        } else if (direction === "back" && width <= 0) {
            speed = Math.max(speed - 1, 1);
        } else if (speed < maxSpeed) {
            speed++;
        }

        if ((direction === "forward" && width >= maxWidth && speed === 1) ||
                (direction === "back" && width <= 0 && speed === 1)) {
            clearInterval(interval);
        }
    }, intervalTime);
}

// Function to hide step 1 and show step 2
function goStep2() {
    // Find the current step and new step
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");
    const flowStep1 = document.querySelector("#flowStep1");
    const flowStep2 = document.querySelector("#flowStep2");

    // Get the attributes of the selected result
    const selectedResult = document.querySelector(".result-radio.checked").parentNode;
    const htsno = selectedResult.getAttribute("data-htsno");
    const description = selectedResult.getAttribute("data-description");
    const chapterDescription = selectedResult.getAttribute("data-chapter-description");
    const sectionDescription = selectedResult.getAttribute("data-section-description");
    const chapter = selectedResult.getAttribute("data-chapter-name");
    const section = selectedResult.getAttribute("data-section-name");
    const general = selectedResult.getAttribute("data-general");
    const other = selectedResult.getAttribute("data-other");
    const specialJSON = selectedResult.getAttribute("data-special-json");
    const units = selectedResult.getAttribute("data-units");
    const matchValues = ["No.", ""]; // The units where the calculation field is value not quantity

    // Set the values of the selected result card on screen 2
    const selectedResultCard = document.querySelector("#selectedResult");
    console.log("selectedResultCard:", selectedResultCard);
    selectedResultCard.querySelector("[data-hts-card='htsno']").textContent = htsno;
    selectedResultCard.querySelector("[data-hts-card='description']").textContent = description;
    selectedResultCard.querySelector("[data-hts-card='chapter-description']").textContent = chapterDescription;
    selectedResultCard.querySelector("[data-hts-card='section-description']").textContent = sectionDescription;
    selectedResultCard.querySelector("[data-hts-card='chapter']").textContent = chapter;
    selectedResultCard.querySelector("[data-hts-card='section']").textContent = section;
    selectedResultCard.setAttribute('data-general', general);
    selectedResultCard.setAttribute('data-other', other);
    selectedResultCard.setAttribute('data-special-json', specialJSON);
    selectedResultCard.setAttribute('data-units', units);
    selectedResultCard.setAttribute('data-htsno', htsno);

    // Function to display the correct unit field – value or quantity
    function displayUnitFields(units, matchValues) {
        const valueWrapper = document.querySelector("#valueWrapper");
        const amountWrapper = document.querySelector("#amountWrapper");
        const valueUnitText = document.querySelector("#valueUnitText");
        const amountUnitText = document.querySelector("#amountUnitText");
        const amountUnitSelect = document.querySelector("#amountUnit");
        amountUnitSelect.innerHTML = "";
        const unitOptions = units.split(",");

        if (matchValues.includes(units)) {
            valueWrapper.style.display = "flex";
            amountWrapper.style.display = "none";
            valueUnitText.textContent = "$";
        } else {
            valueWrapper.style.display = "none";
            amountWrapper.style.display = "flex";
            amountUnitText.textContent = unitOptions[0];
            for (let i = 0; i < unitOptions.length; i++) {
                const option = document.createElement("option");
                option.setAttribute("value", unitOptions[i]);
                option.textContent = unitOptions[i];
                unitQuantitySelect.appendChild(option);
            }
            amountUnitSelect.selectedIndex = 0;        
        }
    }

    // Call the displayUnitFields function
    displayUnitFields(units, matchValues);

    // Call the animateArrow1 function
    animateArrow("arrow1wrapper", "forward");
    // Hide step 1 and show step 2
    gridStep1Wrapper.style.display = "none";
    gridStep2Wrapper.style.display = "flex";
    flowStep1.classList.remove("active");
    flowStep1.classList.add("complete");
    flowStep2.classList.add("active");

    // Remove "active" class and add "complete" class to children and grandchildren of flowStep1
    Array.from(flowStep1.children).forEach(child => {
        child.classList.remove("active");
        child.classList.add("complete");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.remove("active");
            grandchild.classList.add("complete");
        });
    });

    // Add "active" class to children and grandchildren of flowStep2
    Array.from(flowStep2.children).forEach(child => {
        child.classList.add("active");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.add("active");
            grandchild.classList.remove("complete");
        });
    });
}

// Function to hide step 2 and show step 1
function backStep1() {
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");
    const flowStep1 = document.querySelector("#flowStep1");
    const flowStep2 = document.querySelector("#flowStep2");

    flowStep2.classList.remove("active");
    flowStep1.classList.add("active");
    flowStep1.classList.remove("complete");

    animateArrow("arrow1wrapper", "back");

    gridStep1Wrapper.style.display = "flex";
    gridStep2Wrapper.style.display = "none";

    // Remove "complete" class and add "active" class to children and grandchildren of flowStep1
    Array.from(flowStep1.children).forEach(child => {
        child.classList.remove("complete");
        child.classList.add("active");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.remove("complete");
            grandchild.classList.add("active");
        });
    });

    // Remove "active" class and add "complete" class to children and grandchildren of flowStep2
    Array.from(flowStep2.children).forEach(child => {
        child.classList.remove("active");
        child.classList.add("complete");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.remove("active");
            grandchild.classList.add("complete");
        });
    });
}

// Function to set the selected option in a dropdown
function setSelectedOption(selectId, valueToSelect) {
    const select = document.getElementById(selectId);
    console.log("Found element:", select);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === valueToSelect) {
            select.selectedIndex = i;
            console.log("Set selected index to:", i);
            console.log("Selected option:", select.options[i] ? select.options[i].text : "undefined");
            break;
        }
    }
}

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

const shortCountryList = [
    ['CA', 'Canada', 'CAD', 'Canadian dollar'],
    ['US', 'United States', 'USD', 'United States dollar']
];

// Function to create dropdown options
function createDropdownOptions() {
    const importingToSelect = document.getElementById('importingTo');
    const CurrencySelect = document.getElementById('currencySelect');
    const importingFromSelect = document.getElementById('importingFrom');
    const shippingCurrencySelect = document.getElementById('shippingCurrency');
    const insuranceCurrencySelect = document.getElementById('insuranceCurrency');

    // Define common countries and currencies
    const commonCountries = ['CN', 'MX', 'CA', 'JP', 'DE']; // ISO codes of common countries
    const commonCurrencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'CHF', 'HKD', 'NZD', 'SGD'];

    // Helper function to add an option to a select
    function addOption(select, value, text) {
        const option = new Option(text, value);
        select.add(option);
        return option;
    }

    // Add common countries to 'importing from' dropdown
    commonCountries.forEach(isoCode => {
        const country = countries.find(country => country[0] === isoCode);
        if (country) {
            const option = addOption(importingFromSelect, country[0], country[1]);
            option.setAttribute('data-iso-code', country[0]);
            option.setAttribute('data-currency-name', country[2]);
        }
    });

    // Add a divider
    const fromDivider = addOption(importingFromSelect, '', '---');
    fromDivider.setAttribute('disabled', 'true');

    // Add all countries to 'importing from' dropdown
    countries.forEach(country => {
        if (!commonCountries.includes(country[0])) { // Skip if it's a common country
            const option = addOption(importingFromSelect, country[0], country[1]);
            option.setAttribute('data-iso-code', country[0]);
            option.setAttribute('data-currency-name', country[2]);
        }
    });

    // Add options for importingTo from the shortCountryList
    shortCountryList.forEach(country => {
        const option = addOption(importingToSelect, country[0], country[1]);
        option.setAttribute('data-iso-code', country[0]);
        option.setAttribute('data-currency-name', country[2]);
    });

    // A set to keep track of added currencies to avoid duplicates
    const addedCurrencies = new Set();

    // Add common currencies to the top of the 'Currency' dropdown
    commonCurrencies.forEach(currency => {
        if (!addedCurrencies.has(currency)) {
            addedCurrencies.add(currency);
            addOption(CurrencySelect, currency, currency);
        }
    });

    // Add a divider for currencies
    const currencyDivider = addOption(CurrencySelect, '', '---');
    currencyDivider.setAttribute('disabled', 'true');

    // Add the rest of the currencies to the 'Currency' dropdown
    countries.forEach(country => {
        if (!addedCurrencies.has(country[2])) {
            addedCurrencies.add(country[2]);
            addOption(CurrencySelect, country[2], country[2]);
        }
        // Add currencies to 'shipping' and 'insurance' dropdowns
        addOption(shippingCurrencySelect, country[2], country[2]);
        addOption(insuranceCurrencySelect, country[2], country[2]);
    });
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
        setSelectedOption('currencySelect', data.currency);
        console.log('Success:', data.country_name, data.currency);
    })
    .catch(error => {
        console.error('Error:', error);
        setSelectedOption('importingTo', 'United States');
        setSelectedOption('currencySelect', 'US');
        console.log('Defaulting to United States and US');
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