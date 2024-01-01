function ChatComponent() {
    const [inputText, setInputText] = React.useState('');
    const [chatResults, setChatResults] = React.useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        setIsButtonDisabled(true); // Disable the button
        fetch('https://hook.us1.make.com/hx1aw3ym6zmstgfresiudsxv8d8y9t2c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_description: inputText }),
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
                        className="chat-button" // Add the "chat-button" class
                        onClick={handleSend}
                        disabled={isButtonDisabled} // Disable the button when the button is clicked
                    >
                        Send
                    </button>
                </div>
            </div>
            <div id="chatResults">
                {chatResults.map((result, index) => (
                    <div key={index} className="chat-result-card">
                        {result}
                    </div>
                ))}
            </div>
        </div>
    );
}

console.log('Rendering ReactDOM'); // Log the rendering of ReactDOM

ReactDOM.render(React.createElement(ChatComponent), document.getElementById('root'));