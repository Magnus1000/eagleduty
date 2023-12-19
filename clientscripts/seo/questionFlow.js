// This component represents a single question block
function QuestionBlock({ question, answers, onAnswerClick }) {
    return (
        <div className="hs-code-question-block">
            <div>{question}</div>
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className="hs-code-answer"
                    onClick={() => onAnswerClick(answer)}
                >
                    <div className="hs-code-answer-text">{answer.text}</div>
                </div>
            ))}
        </div>
    );
}

// This component represents the main question container
function QuestionDiv() {
    const [questions, setQuestions] = React.useState([]); // State to store all questions
    const [renderedQuestions, setRenderedQuestions] = React.useState([]); // State to store rendered questions

    React.useEffect(() => {
        // Fetching the questions from an API
        fetch('https://live.api-server.io/run/v1/6578af03d402f7f4c1629647')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setQuestions(data); // Updating the state with the fetched questions
                setRenderedQuestions([data[0]]); // Initialize with the first question
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    // Function to handle the click event on an answer
    const handleAnswerClick = (answer) => {
        const nextQuestionIndex = answer.next_question; // Get the next question index from the answer
        if (nextQuestionIndex !== undefined) {
            const nextQuestion = questions.find(q => q.id === nextQuestionIndex);
            if (nextQuestion) {
                setRenderedQuestions(prev => [...prev, nextQuestion]); // Append the next question to the rendered questions
            }
        }
    };

    return (
        <div>
            {renderedQuestions.map((question, index) => (
                <QuestionBlock
                    key={index}
                    question={question.title}
                    answers={question.answers}
                    onAnswerClick={handleAnswerClick}
                />
            ))}
        </div>
    );
}

ReactDOM.render(<QuestionDiv />, document.getElementById('root')); // Rendering the QuestionDiv component to the root element
