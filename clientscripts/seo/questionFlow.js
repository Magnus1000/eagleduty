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
  
          const targetComponent = document.querySelector('[data-jactory="component"]');
          targetComponent.innerHTML = ''; // Clear previous content
  
          // For each question and its answers
          data.forEach(item => {
            const mainClone = document.querySelector('[data-jactory-div="1"]').cloneNode(true);
            
            // Set the question text
            const questionTextDiv = mainClone.querySelector('div:first-child');
            if (questionTextDiv) {
              questionTextDiv.textContent = item.title;
            }
  
            // Remove the template answer div
            const answerDiv = mainClone.querySelector('[data-jactory-div="2"]');
            answerDiv.remove();
  
            // Clone and append answer divs for each answer
            item.answers_text.forEach(answerText => {
              const cloneAnswerDiv = answerDiv.cloneNode(true);
              const answerTextDiv = cloneAnswerDiv.querySelector('.hs-code-answer-text');
              if (answerTextDiv) {
                answerTextDiv.textContent = answerText;
              }
              mainClone.appendChild(cloneAnswerDiv);
            });
  
            targetComponent.appendChild(mainClone); // Append the cloned question block to the target component
          });
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, []);
  
    return React.createElement('div', null);
  }
  
  ReactDOM.render(React.createElement(CloneDiv), document.getElementById('root'));
  