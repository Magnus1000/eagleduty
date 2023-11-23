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
            callVercelServerlessFunction(uuid, 'fetch');
        }

        // Check if UUID exists in cookie
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('uuid='))
            ?.split('=')[1];
        if (cookieValue) {
            uuid = cookieValue;
            callVercelServerlessFunction(uuid, 'fetch');
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
                            callVercelServerlessFunction(uuid, 'fetch');
                        } else {
                            objectStore.add({ uuid: uuid });
                            callVercelServerlessFunction(uuid, 'create');
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
                        callVercelServerlessFunction(uuid, 'fetch');
                    } else {
                        tx.executeSql('INSERT INTO members (uuid) VALUES (?)', [uuid]);
                        callVercelServerlessFunction(uuid, 'create');
                    }
                });
            });
        }

        // If UUID is still empty, generate a new one
        if (!uuid) {
            uuid = generateUUID();
            callVercelServerlessFunction(uuid, 'create');
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

function callVercelServerlessFunction(uuid, action) {
    // Make a request to the Vercel serverless function
    // Pass the UUID as a query parameter
    fetch(`https://your-vercel-function-url?uuid=${uuid}?action=${action}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Response from Vercel serverless function:', data);
        })
        .catch((error) => {
            console.error('Error calling Vercel serverless function:', error);
        });
}

