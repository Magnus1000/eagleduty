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
    const record = data.record; // Assuming there is only one record
    const fields = record.fields;

    const specialJson = JSON.parse(fields.special_json);
    console.log('specialJson:', specialJson);
    const specialValue = specialJson && specialJson[countryOfOrigin];
    console.log('specialValue:', specialValue);

    console.log('data:', data);

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

    let productDetails = '';

    const generalDutyRate = `The general duty rate for your product is ${fields.general_V2}<br>`;
    productDetails += generalDutyRate;

    if (specialValue !== undefined) {
        productDetails += `The special value for country ${countryOfOrigin} is ${specialValue}<br>`;
    }

    if (value === "under2500") {
        productDetails += "Because the value of your import is less than $US2500, you don't need a Customs Bond.<br>";
    } else {
        productDetails += "Since the total import value is greater than $US2500, you’ll need to submit a Customs Bond.<br>";
    }

    if (penaltyRate && penaltyType && penaltyCountry) {
        productDetails += `This product has a penalty rate of ${penaltyRate} ${penaltyType} when imported from ${penaltyCountry}.<br>`;
    }

    const productDetailsDiv = document.getElementById("product-details-div");
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = productDetails;
        console.log('productDetailsDiv:', productDetailsDiv);
    }
}