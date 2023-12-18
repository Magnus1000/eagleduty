function FetchData() {
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
                setQuestions(data); // Update state with fetched data
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return { questions, setQuestions }; // Return the state and the setter function
}

function RenderCloneDiv({ data, index, onAnswerClick }) {
    // Get the target component
    const targetComponent = document.querySelector('[data-jactory="component"]');

    // Clone the main div
    const mainClone = document.querySelector('[data-jactory-div="1"]').cloneNode(true);

    // Set the question text
    const questionTextDiv = mainClone.querySelector('div:first-child');
    if (questionTextDiv && data[index]) {
        questionTextDiv.textContent = data[index].title;
    }

    // Remove the template answer div
    const answerDiv = mainClone.querySelector('[data-jactory-div="2"]');
    answerDiv.remove();

    // Clone and append answer divs for each answer
    data[index].answers_text.forEach((answerText, answerIndex) => {
        const cloneAnswerDiv = answerDiv.cloneNode(true);
        const answerTextDiv = cloneAnswerDiv.querySelector('.hs-code-answer-text');
        if (answerTextDiv) {
            answerTextDiv.textContent = answerText;
            answerTextDiv.dataset.nextQuestionIndex = data[index].next_question[answerIndex] || '';
            answerTextDiv.addEventListener('click', onAnswerClick);
        }
        mainClone.appendChild(cloneAnswerDiv);
    });

    targetComponent.appendChild(mainClone);
}

function CloneDiv() {
    const { questions } = FetchData();

    const handleAnswerClick = (event) => {
        const nextQuestionIndex = parseInt(event.currentTarget.dataset.nextQuestionIndex, 10);
        if (!isNaN(nextQuestionIndex)) {
            loadNextQuestion(nextQuestionIndex);
        }
    };

    const loadNextQuestion = (index) => {
        RenderCloneDiv({ data: questions, index, onAnswerClick: handleAnswerClick });
    };

    React.useEffect(() => {
        if (questions.length > 0) {
            loadNextQuestion(0); // Load the initial question
        }
    }, [questions]);

    return React.createElement('div', null); // Your component render logic
}

ReactDOM.render(React.createElement(CloneDiv), document.getElementById('root'));