import React, { useState } from 'react';

function ChatComponent() {
    const [inputText, setInputText] = useState('');
    const [chatResults, setChatResults] = useState('');

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
                id="chatInputField"
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

export default ChatComponent;