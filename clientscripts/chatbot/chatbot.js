function ChatComponent() {
    const [inputText, setInputText] = React.useState('');
    const [chatResults, setChatResults] = React.useState('');
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
                setChatResults(data.response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsButtonDisabled(false); // Enable the button after the request is completed
            });
    };

    return (
        <div id="chatWrapper">
            <textarea
                id="chatSearch"
                className="text-area-input-absolute" // Add the "text-area-input-absolute" class
                value={inputText}
                onChange={handleInputChange}
                disabled={isButtonDisabled} // Disable the textarea when the button is clicked
            />
            <button
                id="chatSubmit"
                className="chat-button" // Add the "chat-button" class
                onClick={handleSend}
                disabled={isButtonDisabled} // Disable the button when the button is clicked
            >
                Send
            </button>
            <div id="chatResults">{chatResults}</div>
        </div>
    );
}

ReactDOM.render(React.createElement(ChatComponent), document.getElementById('root'));