function QuestionBlock({ question, answers, onAnswerClick }) {
    return (
        <div className="hs-code-question-block">
            <div>{question}</div>
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className="hs-code-answer"
                    onClick={() => onAnswerClick(index)}
                >
                    <div className="hs-code-answer-text">{answer}</div>
                </div>
            ))}
        </div>
    );
}

function QuestionDiv() {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch('https://live.api-server.io/run/v1/6578af03d402f7f4c1629647')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    const handleAnswerClick = (questionIndex, answerIndex) => {
        // Handle answer click logic here
    };

    return (
        <div>
            {questions.map((question, index) => (
                <QuestionBlock
                    key={index}
                    question={question.title}
                    answers={question.answers_text}
                    onAnswerClick={(answerIndex) => handleAnswerClick(index, answerIndex)}
                />
            ))}
        </div>
    );
}

ReactDOM.render(<QuestionDiv />, document.getElementById('root'));