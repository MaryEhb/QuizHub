import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test, isOwner, classroomId }) => {
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/classrooms/${classroomId}/tests/${test._id}`);
  };

  const handleTakeTest = () => {
    setIsTakingTest(true);
  };

  const handleSubmitTest = () => {
    console.log('Test submitted:', answers);
    // Future: Submit to backend here
    setIsTakingTest(false);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div className="test-card" onClick={handleCardClick}>
      <h3>{test.title}</h3>
      <p>{test.description}</p>

      {isTakingTest ? (
        <div className="test-taking">
          {test.questions.map((question) => (
            <div key={question._id} className="test-question">
              <p>{question.text}</p>
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              />
              {isOwner && question.correctAnswer && (
                <div
                  className={`correct-answer ${
                    answers[question._id] === question.correctAnswer ? 'highlight' : ''
                  }`}
                >
                  {question.correctAnswer}
                </div>
              )}
            </div>
          ))}
          <button onClick={handleSubmitTest}>Submit</button>
        </div>
      ) : (
        !isOwner && (
          <button className="btn-take-test" onClick={handleTakeTest}>Take Test</button>
        )
      )}
    </div>
  );
};

export default TestCard;