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

    const apiUrl = `https://eagleduty-magnus1000team.vercel.app/api/website/fetchHTSCode.js?htsno=${htsnoValue}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (product === 'chat') {
            processChatData(data, countryOfOrigin, value);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function processChatData(data, countryOfOrigin, value) {
    console.log('data:', data);
    const record = data.record; // Assuming there is only one record
    const fields = record.fields;

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
                productDetails += `<span class="product-details-text">• When imported from ${countryOfOrigin}, this product enjoys a special duty rate of ${specialValue}% (i.e. there is no duty) due to the <strong>${tradeAgreement.tradeAgreement}</strong>. To qualify for the special rate, you'll need a valid <strong>Certificate of Origin</strong>.</span>`;
            } else {
                productDetails += `<span class="product-details-text">• When imported from ${countryOfOrigin}, this product enjoys a special duty rate of ${specialValue} due to the <strong>${tradeAgreement.tradeAgreement}</strong>. To qualify for the special rate, you'll need a valid <strong>Certificate of Origin</strong>.</span>`;
            }
        }
    }

    if (penaltyRate && penaltyType && penaltyCountry) {
        let penaltySentence = '';
        if (penaltyType === 'additional') {
            penaltySentence = `<span class="product-details-text">• This product has an additional penalty rate of ${penaltyRate} when imported from ${penaltyCountry}.</span><br>`;
        } else if (penaltyType === 'in_lieu') {
            penaltySentence = `<span class="product-details-text">• This product has a penalty rate of ${penaltyRate} in lieu of the general rate when imported from ${penaltyCountry}.</span><br>`;
        }
        productDetails += penaltySentence;
    }

    if (value === "under2500") {
        productDetails += `<span class="product-details-text">• Because the value of your import is less than $US2500, you don't need a Customs Bond.</span>`;
    } else {
        productDetails += `<span class="product-details-text">• Since the total import value is greater than $US2500, you’ll need to submit a <strong>Customs Bond</strong>.</span>`;
    }

    const productDetailsDiv = document.getElementById("product-details-div");
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = productDetails;
        console.log('productDetailsDiv:', productDetailsDiv);
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