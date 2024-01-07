const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const htsnoValue = urlParams.get('htsno');
    const countryOfOrigin = urlParams.get('countryOfOrigin');
    const value = urlParams.get('value');
    const product = urlParams.get('product');

    const apiUrl = `https://eagleduty-magnus1000team.vercel.app/api/website/fetchHTSCode.js?htsno=${htsnoValue}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (product === 'chat') {
            processChatData(data, countryOfOrigin, value);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function processChatData(data, countryOfOrigin, value) {
    const specialJson = data.special_json;
    const specialValue = specialJson[countryOfOrigin];

    const json99 = data["99_json"];
    let penaltyRate = null;
    let penaltyType = null;
    let penaltyCountry = null;

    if (json99 && Array.isArray(json99)) {
        const matchingRecord = json99.find(record => record["99_countries"] === countryOfOrigin);
        if (matchingRecord) {
            penaltyRate = matchingRecord["99_rate"];
            penaltyType = matchingRecord["99_type"];
            penaltyCountry = matchingRecord["99_countries"];
        }
    }

    let productDetails = '';

    const generalDutyRate = `The general duty rate for your product is ${data.general_V2}<br>`;
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
    }
}