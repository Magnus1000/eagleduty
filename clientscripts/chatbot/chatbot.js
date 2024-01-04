function ChatComponent() {
    const [inputText, setInputText] = React.useState('');
    const [chatResults, setChatResults] = React.useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        setIsButtonDisabled(true); // Disable the button
        const uuid = localStorage.getItem('uuid'); // Get the UUID from local storage
        fetch('https://hook.us1.make.com/hx1aw3ym6zmstgfresiudsxv8d8y9t2c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_description: inputText, uuid }), // Include the UUID in the request body
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data); // Log the response
                setChatResults(data); // Set the response as chat results
            })
            .catch((error) => {
                console.error('Error:', error); // Log the error
            })
            .finally(() => {
                setIsButtonDisabled(false); // Enable the button after the request is completed
            });
    };

    console.log('Rendering ChatComponent'); // Log the rendering of the component

    return (
        <div id="chatWrapper">
            <div className="chat-input-button-wrapper"> {/* Wrap textarea and button in a div */}
                <textarea
                    id="chatSearch"
                    className="text-area-input-absolute" // Add the "text-area-input-absolute" class
                    value={inputText}
                    onChange={handleInputChange}
                    disabled={isButtonDisabled} // Disable the textarea when the button is clicked
                />
                <div className="chat-div-button-div"> {/* Wrap the button in a div */}
                    <button
                        id="chatSubmit"
                        className="chat-button"
                        onClick={handleSend}
                        disabled={isButtonDisabled}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M133.9 232L65.8 95.9 383.4 232H133.9zm0 48H383.4L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="chatResults">
                {chatResults.map((result, index) => (
                    <div key={index} className="chat-result-card">
                        <div className="result-breadcrumb">
                            <p>{result.section}</p>
                            <span className="chevron">{'>'}</span>
                            <p>{result.chapter}</p>
                        </div>
                        <p className="result-htsno">{result.htsno}</p>
                        <p className="result-description">{result.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

console.log('Rendering ReactDOM'); // Log the rendering of ReactDOM

ReactDOM.render(React.createElement(ChatComponent), document.getElementById('root'));