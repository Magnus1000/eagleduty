document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const htsnoValue = urlParams.get('htsno');
    const countryOfOrigin = urlParams.get('origin');
    console.log('countryOfOrigin:', countryOfOrigin); 
    const value = urlParams.get('value');
    const product = urlParams.get('product');
    const importnumber = urlParams.get('importnumber');

    const apiUrl = `https://eagleduty-magnus1000team.vercel.app/api/website/fetchHTSCode.js?htsno=${htsnoValue}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (product === 'chat') {
            processChatData(data, countryOfOrigin, value, importnumber);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function processChatData(data, countryOfOrigin, value, importnumber) {
    console.log('data:', data);
    const record = data.record; // Assuming there is only one record
    const fields = record.fields;

    // List of countries
    const countries = {
        "AF": "Afghanistan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AD": "Andorra",
        "AO": "Angola",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BT": "Bhutan",
        "BO": "Bolivia",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BR": "Brazil",
        "BN": "Brunei",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "CV": "Cabo Verde",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CO": "Colombia",
        "KM": "Comoros",
        "CG": "Congo",
        "CR": "Costa Rica",
        "CI": "Côte d'Ivoire",
        "HR": "Croatia",
        "CU": "Cuba",
        "CY": "Cyprus",
        "CZ": "Czech Republic",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "ET": "Ethiopia",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GR": "Greece",
        "GD": "Grenada",
        "GT": "Guatemala",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HN": "Honduras",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "North Korea",
        "KR": "South Korea",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Laos",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "MX": "Mexico",
        "FM": "Micronesia",
        "MD": "Moldova",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "MP": "Northern Mariana Islands",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "RO": "Romania",
        "RU": "Russia",
        "RW": "Rwanda",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "São Tomé and Príncipe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "SS": "South Sudan",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan",
        "SR": "Suriname",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syria",
        "TW": "Taiwan",
        "TJ": "Tajikistan",
        "TZ": "Tanzania",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom",
        "US": "United States",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VA": "Vatican City",
        "VE": "Venezuela",
        "VN": "Vietnam",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe"
    }
    


    // Function to get the country name from the ISO code
    function getCountryName(countryOfOrigin, countries) {
        // Directly access the country name using the ISO code as the key
        const countryName = countries[countryOfOrigin];
        return countryName;
    }

    // Example usage
    const countryName = getCountryName(countryOfOrigin, countries);
    console.log('countryName:', countryName); // Should log 'United States'

    // Check if the Country of Origin enjoys a special duty rate
    const specialJson = JSON.parse(fields.special_json);
    console.log('specialJson:', specialJson);
    const specialValue = specialJson.special_json && specialJson.special_json[countryOfOrigin];
    console.log('specialValue:', specialValue);

    // Check if the Country of Origin has a penalty rate
    const json99 = fields["99_json"];
    console.log('json99:', json99);
    let penaltyRate = null;
    let penaltyType = null;
    let penaltyCountry = null;

    if (json99) {
        let parsedJson99;
        try {
            parsedJson99 = JSON.parse(json99);
        } catch (error) {
            console.error('Failed to parse json99:', error);
        }

        if (Array.isArray(parsedJson99)) {
            console.log('json99 is an array');
            const matchingRecord = parsedJson99.find(record => record["99_countries"] === countryOfOrigin);
            console.log('matchingRecord:', matchingRecord);
            if (matchingRecord) {
                penaltyRate = matchingRecord["99_rate"];
                console.log('penaltyRate:', penaltyRate);
                penaltyType = matchingRecord["99_type"];
                penaltyCountry = matchingRecord["99_countries"];
            }
        }
    }

    // Create the product details string
    let productDetails = '';

    const generalDutyRate = `• The general duty rate for your product is ${fields.general_V2}.<br>`;
    productDetails += `<span class="product-details-text">${generalDutyRate}</span>`;

    if (specialValue !== undefined) {
        const tradeAgreement = tradeAgreements.find(agreement => agreement.countryCode === countryOfOrigin);
        if (tradeAgreement) {
            if (specialValue === 0) {
                productDetails += `<span class="product-details-text">• When imported from ${countryName}, this product enjoys a special duty rate of ${specialValue}% (i.e. there is no duty) due to the <strong>${tradeAgreement.tradeAgreement}</strong>. To qualify for the special rate, you'll need a valid <strong>Certificate of Origin</strong>.</span>`;
            } else {
                productDetails += `<span class="product-details-text">• When imported from ${countryName}, this product enjoys a special duty rate of ${specialValue} due to the <strong>${tradeAgreement.tradeAgreement}</strong>. To qualify for the special rate, you'll need a valid <strong>Certificate of Origin</strong>.</span>`;
            }
        }
    }

    if (penaltyRate && penaltyType && penaltyCountry) {
        let penaltySentence = '';
        if (penaltyType === 'additional') {
            penaltySentence = `<span class="product-details-text">• This product has an additional penalty rate of ${penaltyRate} when imported from ${countryName}.</span>`;
        } else if (penaltyType === 'in_lieu') {
            penaltySentence = `<span class="product-details-text">• This product has a penalty rate of ${penaltyRate} in lieu of the general rate when imported from ${countryName}.</span>`;
        }
        productDetails += penaltySentence;
    }

    if (value === "under2500") {
        productDetails += `<span class="product-details-text">• Because the value of your import is less than $US2500, you don't need a Customs Bond.</span>`;
    } else {
        productDetails += `<span class="product-details-text">• Since the total import value is greater than $US2500, you’ll need an <strong>Import Number</strong>. You'll also need to provide a <strong>Customs Bond</strong>.</span>`;
    }
    
    const regulationSentence = fields.regulation_text;
    if (regulationSentence) {
        productDetails += `<span class="product-details-text">• ${regulationSentence}</span>`;
    }

    const productDetailsDiv = document.getElementById("product-details-div");
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = productDetails;
        console.log('productDetailsDiv:', productDetailsDiv);
    }

    // Recommendation Text
    let recommendationText = '';
    if (value === "under2500") {
        recommendationText = `Since the value of your import is less than $US2500, we recommend an HTS Code Assessment to ensure you're not overpaying on import duties and avoid import fines.`;
        const recommendationTextDiv = document.getElementById("product-recommendation-div-1");
        const productWrapperDiv = document.getElementById("product-column-wrapper-1");
        const recommendedTextHeader = document.getElementById("recommended-text-1");
        recommendationTextDiv.innerHTML = recommendationText;
        productWrapperDiv.classList.add("recommended");
        recommendedTextHeader.classList.add("recommended");
    } else if (value != "under2500" && importnumber === "yes") {
        recommendationText = `Since the value of your import is greater than $US2500, and you have an Import Number, we recommend getting a Duty Ruling. This will protect you from import penalties and potential import delays.`;
        const recommendationTextDiv = document.getElementById("product-recommendation-div-2");
        const productWrapperDiv = document.getElementById("product-column-wrapper-2");
        const recommendedTextHeader = document.getElementById("recommended-text-2");
        recommendationTextDiv.innerHTML = recommendationText;
        productWrapperDiv.classList.add("recommended");
        recommendedTextHeader.classList.add("recommended");
    } else if (value != "under2500" && importnumber === "no") {
        recommendationText = `Since the value of your import is greater than $US2500, and you don't have an Import Number, we recommend a consultation with one of our expert Customs Specialists. They'll help you understand the requirements for your import.`;
        const recommendationTextDiv = document.getElementById("product-recommendation-div-3");
        const productWrapperDiv = document.getElementById("product-column-wrapper-3");
        const recommendedTextHeader = document.getElementById("recommended-text-3");
        recommendationTextDiv.innerHTML = recommendationText;
        productWrapperDiv.classList.add("recommended");
        recommendedTextHeader.classList.add("recommended");
    }
}

const tradeAgreements = [
    {
        "countryCode": "AU",
        "countryName": "Australia",
        "tradeAgreement": "United States-Australia Free Trade Agreement (AUSFTA)"
    },
    {
        "countryCode": "BH",
        "countryName": "Bahrain",
        "tradeAgreement": "United States-Bahrain Free Trade Agreement (USBFTA)"
    },
    {
        "countryCode": "CA",
        "countryName": "Canada",
        "tradeAgreement": "United States-Mexico-Canada Agreement (USMCA), previously known as the North American Free Trade Agreement (NAFTA)"
    },
    {
        "countryCode": "CL",
        "countryName": "Chile",
        "tradeAgreement": "United States-Chile Free Trade Agreement (USCFTA)"
    },
    {
        "countryCode": "CO",
        "countryName": "Colombia",
        "tradeAgreement": "United States-Colombia Trade Promotion Agreement (CTPA)"
    },
    {
        "countryCode": "CR",
        "countryName": "Costa Rica",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR), which also includes other Central American countries"
    },
    {
        "countryCode": "DO",
        "countryName": "Dominican Republic",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"
    },
    {
        "countryCode": "SV",
        "countryName": "El Salvador",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"
    },
    {
        "countryCode": "GT",
        "countryName": "Guatemala",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"
    },
    {
        "countryCode": "HN",
        "countryName": "Honduras",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"
    },
    {
        "countryCode": "IL",
        "countryName": "Israel",
        "tradeAgreement": "United States-Israel Free Trade Agreement (USIFTA)"
    },
    {
        "countryCode": "JO",
        "countryName": "Jordan",
        "tradeAgreement": "United States-Jordan Free Trade Agreement (USJFTA)"
    },
    {
        "countryCode": "KR",
        "countryName": "Korea, Republic of",
        "tradeAgreement": "United States-Korea Free Trade Agreement (KORUS FTA)"
    },
    {
        "countryCode": "MX",
        "countryName": "Mexico",
        "tradeAgreement": "United States-Mexico-Canada Agreement (USMCA)"
    },
    {
        "countryCode": "MA",
        "countryName": "Morocco",
        "tradeAgreement": "United States-Morocco Free Trade Agreement (USMFTA)"
    },
    {
        "countryCode": "NI",
        "countryName": "Nicaragua",
        "tradeAgreement": "Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR)"
    },
    {
        "countryCode": "OM",
        "countryName": "Oman",
        "tradeAgreement": "United States-Oman Free Trade Agreement (USOFTA)"
    },
    {
        "countryCode": "PA",
        "countryName": "Panama",
        "tradeAgreement": "United States-Panama Trade Promotion Agreement (PATPA)"
    },
    {
        "countryCode": "PE",
        "countryName": "Peru",
        "tradeAgreement": "United States-Peru Trade Promotion Agreement (PTPA)"
    },
    {
        "countryCode": "SG",
        "countryName": "Singapore",
        "tradeAgreement": "United States-Singapore Free Trade Agreement (USSFTA)"
    }
]

