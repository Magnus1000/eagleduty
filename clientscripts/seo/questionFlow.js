// This component represents a single question block
function QuestionBlock({ question, answers, onAnswerClick }) {
    return (
        <div className="hs-code-question-block">
            <div>{question}</div>
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className="hs-code-answer"
                    onClick={() => onAnswerClick(answer.next_question)}
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
                // Process the data to combine answers text with their next_question value
                const processedData = data.map((item) => ({
                    ...item,
                    answers: item.answers_text.map((text, index) => ({
                        text,
                        next_question: item.next_question ? item.next_question[index] : null
                    }))
                }));

                setQuestions(processedData); // Updating the state with the processed questions
                setRenderedQuestions([processedData[0]]); // Initialize with the first question
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    // Function to handle the click event on an answer
    const handleAnswerClick = (nextQuestionIndex) => {
        if (nextQuestionIndex !== null) {
            const nextQuestion = questions.find(q => q.id === nextQuestionIndex);
            if (nextQuestion) {
                console.log("Selected answer value:", nextQuestionIndex); // Log the selected answer value to the console
                setRenderedQuestions(prev => [...prev, nextQuestion]); // Append the next question
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
