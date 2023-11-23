const max_count = 10; 

window.$memberstackDom.getCurrentMember().then((member) => {
    if (member.data) {
        console.log('There is a member', member);
        // Do logged in logic here
    } else {
        console.log('No member', member);
        let uuid = '';

        // Check if UUID exists in local storage
        if (localStorage.getItem('uuid')) {
            uuid = localStorage.getItem('uuid');
        }

        // Check if UUID exists in cookie
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('uuid='))
            ?.split('=')[1];
        if (cookieValue) {
            uuid = cookieValue;
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
                    } else {
                        tx.executeSql('INSERT INTO members (uuid) VALUES (?)', [uuid]);
                    }
                });
            });
        }

        // If UUID is still empty, generate a new one
        if (!uuid) {
            uuid = generateUUID();
            // Set "daily_count" to a constant value
            localStorage.setItem('daily_count', max_count);
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
        callVercelServerlessFunction(uuid, 'fetch').then((data) => {
            // Set "daily_count" to the value returned from the Vercel fetch call
            localStorage.setItem('daily_count', data.daily_count);
        }).catch((error) => {
            console.error('Error calling Vercel serverless function:', error);
        });
    }
});

function generateUUID() {
    // Generate a UUID (Universally Unique Identifier)
    // Implementation of RFC4122 version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function callVercelServerlessFunction(uuid, action, count) {
    // Make a request to the Vercel serverless function
    // Pass the UUID as a query parameter
    fetch(`https://eagleduty-magnus1000team.vercel.app/api/website/membershipServerless?uuid=${uuid}&action=${action}&count=${count}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Response from Vercel serverless function:', data);
        })
        .catch((error) => {
            console.error('Error calling Vercel serverless function:', error);
        });
}

// Function to track the limit
function subtractFromDailyCount() {
    // Get the current value of "daily_count" from local storage
    let dailyCount = localStorage.getItem('daily_count');

    // Check if "daily_count" exists in local storage
    if (dailyCount) {
        // Convert the value to a number and subtract 1
        dailyCount = parseInt(dailyCount) - 1;

        // Update the "daily_count" value in local storage
        localStorage.setItem('daily_count', dailyCount.toString());

        // Get the UUID from local storage
        const uuid = localStorage.getItem('uuid');

        // Call the Vercel serverless function with the query parameters
        callVercelServerlessFunction(uuid, 'update', dailyCount);
    }
}