// This component represents a single question block
function QuestionBlock({ question, answers, onAnswerClick }) {
    return (
        <div className="hs-code-question-block">
            <div>{question}</div>
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className="hs-code-answer"
                    // answer is an object within the answers array.
                    // Set the prop onAnswerClick, which represents a function, passing the next_question value. The function is defined in the QuestionDiv component.
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
    // questions is an array of all questions. setQuestions is a function to update the state.
    const [questions, setQuestions] = React.useState([]); // State to store all questions
    // renderedQuestions is an array of questions that have been rendered. setRenderedQuestions is a function to update the state.   
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
                    // Create a new object with the same properties as the original object
                    ...item,
                    // Callback function to define the answers property, mapping the answer_text and the next_question. 
                    // The incoming answers_text array is "answers_text": ["Yes", "No"] and next_question is "next_question": [3, 6]
                    answers: item.answers_text.map((text, index) => ({
                        text,
                        next_question: item.next_question ? item.next_question[index] : null
                    }))
                    // The processed data will look like this: {"title": "Are the shoes purposely waterproof?", "answers": [{"text": "Yes", "next_question": 3}, {"text": "No", "next_question": 6}]}
                }));

                setQuestions(processedData); // Updating the state (questions array) with the processed questions
                setRenderedQuestions([processedData[0]]); // Initialize the rendered questions array with the first question
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    // Function to handle the click event on an answer
    const handleAnswerClick = (nextQuestionIndex) => {
        if (nextQuestionIndex) {
            console.log("Selected answer value:", nextQuestionIndex); // Log the selected answer value to the console
            // Find the next question in questions, searching by index, based on the next_question value
            const nextQuestion = questions[nextQuestionIndex];
            if (nextQuestion) {
                setRenderedQuestions(prev => [...prev, nextQuestion]); // Append the next question
            }
        }
        else {
            console.log("No next question"); // Log that there is no next question
        }
    };

    return (
        <div>
            {renderedQuestions.map((question, index) => (
                <QuestionBlock
                    key={index}
                    // Pass the question title to the QuestionBlock component as a prop
                    question={question.title}
                    // Pass the answers array to the QuestionBlock component as a prop
                    answers={question.answers}
                    // Pass the handleAnswerClick function to the QuestionBlock component as a prop
                    onAnswerClick={handleAnswerClick}
                />
            ))}
        </div>
    );
}

ReactDOM.render(<QuestionDiv />, document.getElementById('root')); // Rendering the QuestionDiv component to the root element
