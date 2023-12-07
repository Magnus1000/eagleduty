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

        // Check if UUID exists in cookie
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('uuid='))
            ?.split('=')[1];
        if (cookieValue) {
            uuid = cookieValue;
            console.log('UUID found in cookie:', uuid);
        }

        // Check if UUID exists in IndexedDB
        if ('indexedDB' in window) {
            const request = window.indexedDB.open('myDatabase', 1);
            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore('members', { keyPath: 'uuid' });
                objectStore.transaction.oncomplete = function () {
                    const objectStore = db.transaction('members', 'readwrite').objectStore('members');
                    const getRequest = objectStore.get('uuid');
                    getRequest.onsuccess = function (event) {
                        if (event.target.result) {
                            uuid = event.target.result.uuid;
                            console.log('UUID found in IndexedDB:', uuid);
                        } else {
                            objectStore.add({ uuid: uuid });
                        }
                    };
                };
            };
        }

        // Check if UUID exists in WebSQL
        if ('openDatabase' in window) {
            const db = window.openDatabase('myDatabase', '1.0', 'My Database', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS members (uuid)');
                tx.executeSql('SELECT * FROM members', [], function (tx, result) {
                    if (result.rows.length > 0) {
                        uuid = result.rows.item(0).uuid;
                        console.log('UUID found in WebSQL:', uuid);
                    } else {
                        tx.executeSql('INSERT INTO members (uuid) VALUES (?)', [uuid]);
                    }
                });
            });
        }

        // If UUID is still empty, generate a new one
        if (!uuid) {
            uuid = generateUUID();
            // Set "calc_count" to a constant value
            localStorage.setItem('calc_count', starting_count);
            await callVercelServerlessFunction(uuid, 'create', starting_count);
            console.log('No UUID exists. New UUID generated:', uuid);
        }

        // Set UUID in local storage
        localStorage.setItem('uuid', uuid);

        // Set UUID as a cookie
        document.cookie = `uuid=${uuid}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;

        // Set UUID in IndexedDB
        if ('indexedDB' in window) {
            const request = window.indexedDB.open('myDatabase', 1);
            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore('members', { keyPath: 'uuid' });
                objectStore.add({ uuid: uuid });
            };
        }

        // Set UUID in WebSQL
        if ('openDatabase' in window) {
            const db = window.openDatabase('myDatabase', '1.0', 'My Database', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS members (uuid)');
                tx.executeSql('INSERT INTO members (uuid) VALUES (?)', [uuid]);
            });
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