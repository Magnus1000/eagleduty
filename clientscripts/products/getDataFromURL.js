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


    // Function to get the country name from the ISO code
    function getCountryName(countryOfOrigin, countries) {
        const countryName = countries[countryOfOrigin];
        return countryName;
    }

    // Get the country name
    const countryName = getCountryName(countryOfOrigin, countries);
    console.log('countryName:', countryName);

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

