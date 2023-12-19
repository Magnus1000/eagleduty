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
                    <div className="hs-code-answer-text">{answer}</div>
                </div>
            ))}
        </div>
    );
}

// This component represents the main question container
function QuestionDiv() {
    const [questions, setQuestions] = React.useState([]); // State to store the questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0); // State to track the current question index

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
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    // Function to handle the click event on an answer
    const handleAnswerClick = (value) => {
        const currentQuestion = questions[currentQuestionIndex]; // Get the current question object
        const nextQuestionIndex = currentQuestion.answers.find((answer) => answer.value === value)?.next_question; // Get the next question index based on the selected answer value

        if (nextQuestionIndex !== undefined) {
            setCurrentQuestionIndex(nextQuestionIndex); // Update the current question index with the next question index
        }
    };

    return (
        <div>
            {questions.length > 0 && (
                <QuestionBlock
                    question={questions[currentQuestionIndex].title} // Displaying the current question
                    answers={questions[currentQuestionIndex].answers_text} // Displaying the answers for the current question
                    onAnswerClick={(value) => handleAnswerClick(value)} // Passing the click event handler to the question block
                />
            )}
        </div>
    );
}

ReactDOM.render(<QuestionDiv />, document.getElementById('root')); // Rendering the QuestionDiv component to the root element