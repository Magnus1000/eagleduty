const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const htsnoValue = urlParams.get('htsno');
    const countryOfOrigin = urlParams.get('countryOfOrigin');
    const value = urlParams.get('value');

    const apiUrl = `https://eagleduty-magnus1000team.vercel.app/api/website/fetchHTSCode.js?htsno=${htsnoValue}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        processFetchData(data, countryOfOrigin, value);
    } catch (error) {
        console.error('Error:', error);
    }
}

function processFetchData(data, countryOfOrigin, value) {
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

    if (specialValue !== undefined) {
        console.log(`The special value for country ${countryOfOrigin} is ${specialValue}`);
    } else {
        console.log(`No special value found for country ${countryOfOrigin}`);
    }

    if (value === "under2500") {
        console.log("Because the value of your import is less than $US2500, you don't need a Customs Bond.");
    } else {
        console.log("Since the total import value is greater than $US2500, you’ll need to submit a Customs Bond.");
    }

    if (penaltyRate && penaltyType && penaltyCountry) {
        console.log(`This product has a penalty rate of ${penaltyRate} ${penaltyType} when imported from ${penaltyCountry}.`);
    } else {
        console.log(`No penalty rate found for country ${countryOfOrigin}`);
    }

    const generalDutyRate = `The general duty rate for your product is ${data.general_V2}`;
    console.log(generalDutyRate);
}