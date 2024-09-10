import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTestDetails } from '../services/testService'; // Import service to fetch test details
import { useAuth } from '../context/AuthContext'; // Import AuthContext to get user info

const Test = () => {
  const { classroomId, testId } = useParams(); // Get classroomId and testId from route parameters
  const { user } = useAuth(); // Get user info from AuthContext
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({}); // For storing user answers
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const testData = await fetchTestDetails(classroomId, testId); // Fetch test details
        setTest(testData);
      } catch (error) {
        console.error('Failed to fetch test details:', error);
      }
    };

    getTestDetails();
  }, [classroomId, testId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (test) {
      // Calculate the number of correct answers
      let count = 0;
      test.questions.forEach(question => {
        if (answers[question._id] === question.correctAnswer) {
          count += 1;
        }
      });
      setCorrectAnswersCount(count);
    }
    setSubmitted(true);
  };

  if (!test) {
    return <p>Loading test details...</p>;
  }

  return (
    <div className="test-page">
      <h1>{test.title}</h1>
      <p>{test.description}</p>
      <div className="questions">
        {test.questions.map(question => (
          <div key={question._id} className="question">
            <p>{question.questionText}</p>
            {user ? (
              <div className="options">
                {question.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <p>Login to take the test</p>
            )}
          </div>
        ))}
      </div>

      {user && !submitted && (
        <button onClick={handleSubmit}>Submit</button>
      )}

      {submitted && (
        <div className="submission-feedback">
          <p>Thank you for submitting the test!</p>
          <p>Your answers:</p>
          <ul>
            {Object.entries(answers).map(([questionId, answer]) => {
              const question = test.questions.find(q => q._id === questionId);
              return (
                <li key={questionId}>
                  <strong>{question.questionText}</strong>: {answer || 'No answer'}
                </li>
              );
            })}
          </ul>
          <p>
            You got {correctAnswersCount} out of {test.questions.length} correct.
          </p>
        </div>
      )}

      {/* For owners only */}
      {user && user._id === test.owner && (
        <div className="correct-answers">
          <h2>Correct Answers</h2>
          {test.questions.map(question => (
            <div key={question._id} className="question">
              <p>{question.questionText}</p>
              <div className="options">
                {question.options.map((option, index) => (
                  <p
                    key={index}
                    className={`option ${option === question.correctAnswer ? 'correct' : ''}`}
                  >
                    {option}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;