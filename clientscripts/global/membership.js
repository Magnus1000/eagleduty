let starting_count = 0;

(async function () {
    const member = await window.$memberstackDom.getCurrentMember();
    if (member.data) {
        console.log('There is a member', member);
    } else {
        console.log('No member', member);
        let uuid = '';

        // Check if UUID exists in local storage
        if (localStorage.getItem('uuid')) {
            uuid = localStorage.getItem('uuid');
            console.log('UUID found in local storage:', uuid);
        }

        // If UUID is still empty, generate a new one
        if (!uuid) {
            uuid = generateUUID();
            // Set "calc_count" to a constant value
            localStorage.setItem('calc_count', starting_count);
            localStorage.setItem('uuid', uuid);
            await callVercelServerlessFunction(uuid, 'create', starting_count);
            console.log('No UUID exists. New UUID generated:', uuid);
        }

        // Make a request to the Vercel serverless function
        // Pass the UUID as a query parameter
        const response = await callVercelServerlessFunction(uuid, 'fetch');
        const calc_count = response?.calc_count;

        // Check if "calc_count" exists in local storage
        if (localStorage.getItem('calc_count')) {
            // If it exists, set it to the value returned from the serverless function
            localStorage.setItem('calc_count', calc_count);
        } else {
            // If it doesn't exist, create it and set the value to the value returned from the serverless function
            localStorage.setItem('calc_count', calc_count);
        }

        // Log the count from Supabase
        console.log('calc_count', calc_count);
    }
})();

function generateUUID() {
    // Generate a UUID (Universally Unique Identifier)
    // Implementation of RFC4122 version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

async function callVercelServerlessFunction(uuid, action, count) {
    try {
        // Make a request to the Vercel serverless function
        // Pass the UUID as a query parameter
        const response = await fetch(
            `https://eagleduty-magnus1000team.vercel.app/api/website/membershipServerless?uuid=${uuid}&action=${action}&count=${count}`
        );
        const data = await response.json();
        console.log('Response from Vercel serverless function:', data);
        return data;
    } catch (error) {
        console.error('Error calling Vercel serverless function:', error);
    }
}

// Function to track the limit
async function addToCount() {
    // Get the current value of "calc_count" from local storage
    let calcCount = localStorage.getItem('calc_count');

    // Check if "calc_count" exists in local storage
    if (calcCount) {
        // Convert the value to a number and add 1
        calcCount = parseInt(calcCount) + 1;

        // Update the "calc_count" value in local storage
        localStorage.setItem('calc_count', calcCount.toString());

        // Check if "member.data" exists
        const member = await window.$memberstackDom.getCurrentMember();
        if (!member.data) {
            // Get the UUID from local storage
            const uuid = localStorage.getItem('uuid');

            // Call the Vercel serverless function with the query parameters
            callVercelServerlessFunction(uuid, 'update', calcCount);
        }
    }
}