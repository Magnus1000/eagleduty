function ChatComponent() {
    const [inputText, setInputText] = React.useState(''); // useState is accessed from React global object
    const [chatResults, setChatResults] = React.useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        fetch('https://hook.us1.make.com/kmpo5x4qg1d26u9tf8xgveix5ylj61yx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
        })
            .then((response) => response.json())
            .then((data) => {
                setChatResults(data.response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div id="chatWrapper">
            <input
                type="text"
                id="chatSearch"
                value={inputText}
                onChange={handleInputChange}
            />
            <button id="chatSubmit" onClick={handleSend}>
                Send
            </button>
            <div id="chatResults">{chatResults}</div>
        </div>
    );
}

// If you're not using a module bundler that supports JSX, you'll need to use React.createElement
// Otherwise, you can use JSX as below if your environment supports it
ReactDOM.render(React.createElement(ChatComponent), document.getElementById('root'));
