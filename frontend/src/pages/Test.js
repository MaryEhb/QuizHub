import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTestDetails } from '../services/testService';
import { useAuth } from '../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Test = () => {
  const { classroomId, testId } = useParams();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showScorePrompt, setShowScorePrompt] = useState(false);
  const navigate = useNavigate();
  const generalMsgUpdate = useGeneralMsgUpdate();

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const testData = await fetchTestDetails(classroomId, testId);
        console.log(testData);
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
      let count = 0;

      test.questions.forEach(question => {
        const selectedAnswerIndex = question.options.indexOf(answers[question._id]);
        if (selectedAnswerIndex === Number(question.correctAnswer)) {
          count += 1;
        }
      });

      setCorrectAnswersCount(count);
      generalMsgUpdate('Submitted answers successfully', 'success');
      setSubmitted(true);
      setShowScorePrompt(true); // Show score prompt after submission
    }
  };

  const handleViewTest = () => {
    setShowScorePrompt(false); // Remove the prompt
  };

  const handleGoBackToClassroom = () => {
    navigate(-1); // Navigate back to the classroom
  };

  const isOwner = user._id === test?.classroomId.owner; // Check if user is the owner

  const allQuestionsAnswered = test ? test.questions.every(question => answers[question._id]) : false;

  if (!test) {
    return <p>Loading test details...</p>;
  }

  return (
    <div className="test-page">
      <button className="close-button" onClick={() => navigate(-1)}><IoIosArrowBack /></button>
      <div className='test-info-container'>
        <h1>{test.title}</h1>
        {test.description && (
          <div className='test-info'>
            <h2>Description:</h2>
            <p>{test.description}</p>
          </div>
        )}
        {test.requirements && (
          <div className='test-info'>
            <h2>Requirements:</h2>
            <p>{test.requirements}</p>
          </div>
        )}
      </div>

      <div className="questions">
        <ol>
          {test.questions.map((question, index) => (
            <li key={question._id} className={`question-container ${submitted ? 'submitted' : ''}`}>
              <p className="question">Question {index + 1}: {question.questionText}</p>
              <div className="options">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === Number(question.correctAnswer);
                  const isSelected = option === answers[question._id];
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <label 
                      key={optionIndex} 
                      className={
                        submitted ? 
                          (isCorrect ? 'correct' : isWrong ? 'wrong' : '') 
                          : ''
                      }
                    >
                      <input
                        type="radio"
                        name={question._id}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(question._id, option)}
                        disabled={submitted || isOwner} // Disable inputs if submitted or if user is owner
                      />
                      {option}
                      {(isOwner || submitted) && isCorrect && ( // Show checkmark only after submission
                        <FaCheck className="checkmark-icon" />
                      )}
                      {submitted && isWrong && ( // Show cross for wrong answer only after submission
                        <IoClose className="wrongmark-icon" />
                      )}
                    </label>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {!submitted && !isOwner && (
        <div className="submit-button-container">
          <button
            className='btn btn-success'
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
          >
            Submit
          </button>
          {!allQuestionsAnswered && (
            <span className="tooltip">Please answer all questions before submitting.</span>
          )}
        </div>
      )}

      {/* Prompt after submission */}
      {showScorePrompt && !isOwner && (
        <div className='prompt-container'> 
          <div className="submission-prompt prompt">
            <p>You scored {correctAnswersCount} out of {test.questions.length}.</p>
            <button className='btn' onClick={handleViewTest}>View Test</button>
            <button className='btn btn-close' onClick={handleGoBackToClassroom}>Go Back to Classroom</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;