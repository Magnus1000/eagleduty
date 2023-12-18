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

                    // Clone the main div without the answers
                    const mainClone = sourceDiv.cloneNode(false);
                    targetComponent.appendChild(mainClone);

                    console.log('Number of answers:', data[0].answers_text.length);

                    // Set the question text
                    const questionTextSlot = mainClone.querySelector('[slot="questionText"]');
                    if (questionTextSlot) {
                        questionTextSlot.textContent = data.title;
                    }

                    // Iterate over the answers_text array and clone the answer div for each
                    data[0].answers_text.forEach(answerText => {
                        const answerDiv = document.querySelector('[data-jactory-div="2"]');
                        if (answerDiv) {
                            const clone = answerDiv.cloneNode(true);
                            clone.textContent = answerText; // Set the answer text from the data
                            mainClone.appendChild(clone);
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