import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { createTest } from '../services/testService';  // Import the service
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';

const CreateTestView = () => {
  const { classroomId } = useParams();  
  const [testTitle, setTestTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', ''], correctAnswerIndex: 0 }
  ]);
  const updateGeneralMsg = useGeneralMsgUpdate();

  const handleTitleChange = (e) => {
    setTestTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);

    if (updatedQuestions[questionIndex].correctAnswerIndex >= optionIndex) {
      updatedQuestions[questionIndex].correctAnswerIndex = 0;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', ''], correctAnswerIndex: 0 }]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTest = {
        title: testTitle,
        questions: questions.map(question => ({
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswerIndex
        })),
      };
      // Call the createTest service to send the request to the backend
      await createTest(classroomId, newTest);

      // Show success message
      updateGeneralMsg('Test created successfully', 'success');
    } catch (error) {
      // Show error message if something goes wrong
      updateGeneralMsg('Failed to create test', 'error');
    }
  };

  return (
    <div className="create-test">
      <h2>Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="test-info">
          <label>
            Test Title:
            <input type="text" value={testTitle} onChange={handleTitleChange} required />
          </label>
        </div>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question">
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                required
              />
            </label>

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option">
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    required
                  />
                </label>
                <label>
                  Correct Answer:
                  <input
                    type="radio"
                    name={`correct-answer-${questionIndex}`}
                    value={optionIndex}
                    checked={question.correctAnswerIndex === optionIndex}
                    onChange={(e) => handleCorrectAnswerChange(questionIndex, parseInt(e.target.value))}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                  disabled={question.options.length <= 2} // Disable removal if only 2 options
                >
                  Remove Option
                </button>
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(questionIndex)}>
              Add Option
            </button>

            <button
              type="button"
              onClick={() => handleRemoveQuestion(questionIndex)}
              disabled={questions.length <= 1} // Disable removal if only 1 question
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>

        <button type="submit">Create Test</button>
      </form>
    </div>
  );
};

export default CreateTestView;