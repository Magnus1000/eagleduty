function CloneDiv() {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch('https://live.api-server.io/run/v1/6578af03d402f7f4c1629647')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setQuestions(data); // Update state with fetched data

                const sourceDiv = document.querySelector('[data-jactory-div="1"]');
                const targetComponent = document.querySelector('[data-jactory="component"]');

                if (sourceDiv && targetComponent) {
                    // Clear previous answers if any
                    targetComponent.innerHTML = '';

                    // Deep clone the main div to include structural elements but without the answer content
                    const mainClone = sourceDiv.cloneNode(true); 
                    targetComponent.appendChild(mainClone);

                    console.log('Number of answers:', data[0].answers_text.length);

                    // Set the question text
                    const questionTextSlot = mainClone.querySelector('[slot="question-text"]');
                    if (questionTextSlot) {
                        questionTextSlot.textContent = data[0].title;
                    }
                    
                    // Remove existing answer divs before cloning new ones
                    mainClone.querySelectorAll('[data-jactory-div="2"]').forEach(node => node.remove());

                    // Iterate over the answers_text array and clone the answer div for each
                    const answerTemplate = document.querySelector('[data-jactory-div="2"]');
                    data[0].answers_text.forEach(answerText => {
                        if (answerTemplate) {
                            const clone = answerTemplate.cloneNode(true);
                            const answerTextSlot = clone.querySelector('[slot="answer-text"]');
                            if (answerTextSlot) {
                                answerTextSlot.textContent = answerText; // Set the answer text from the data
                            }
                            mainClone.appendChild(clone); // Append the cloned answer to the mainClone
                        }
                    });
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return React.createElement('div', null);
}

ReactDOM.render(React.createElement(CloneDiv), document.getElementById('root'));