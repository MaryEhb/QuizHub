import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { createTest } from '../services/testService'; 
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { IoIosArrowBack } from 'react-icons/io';

const CreateTest = () => {
  const { classroomId } = useParams();  
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', ''], correctAnswerIndex: 0 }
  ]);
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const updateGeneralMsg = useGeneralMsgUpdate();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRequirementsChange = (e) => {
    setRequirements(e.target.value);
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
      updatedQuestions[questionIndex].correctAnswerIndex = Math.max(0, updatedQuestions[questionIndex].correctAnswerIndex - 1);
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
    setLoading(true);
    try {
      const newTest = {
        title,
        description,
        requirements,
        allowMultipleSubmissions: false,
        questions: questions.map(question => ({
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswerIndex,
          questionType: 'multiple-choice',
        })),
      };
      await createTest(classroomId, newTest);
      navigate(-1);
      updateGeneralMsg('Test created successfully', 'success');
    } catch (error) {
      updateGeneralMsg('Failed to create test', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-test">
      <button className="close-button" onClick={() => navigate(-1)}><IoIosArrowBack /></button>
      <h2>Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="test-info">
          <label>
            Test Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              disabled={loading}  // Disable input during submission
              required
            />
          </label>

          <label>
            Test Description:
            <input
              type="text"
              value={description}
              placeholder='Optional'
              onChange={handleDescriptionChange}
              disabled={loading}  // Disable input during submission
            />
          </label>

          <label>
            Test Requirements:
            <input
              type="text"
              placeholder='Optional'
              value={requirements}
              onChange={handleRequirementsChange}
              disabled={loading}  // Disable input during submission
            />
          </label>
        </div>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question">
            <button
              className='remove-option'
              type="button"
              onClick={() => handleRemoveQuestion(questionIndex)}
              disabled={questions.length <= 1 || loading} // Disable removal if only 1 question or during submission
            >
              &#x2715;
            </button>
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                disabled={loading}  // Disable input during submission
                required
              />
            </label>

            <div className='choices'>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option">
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    disabled={loading}  // Disable input during submission
                    required
                  />
                </label>
                <button
                  type="button"
                  className={`correct-answer-btn ${question.correctAnswerIndex === optionIndex ? 'selected' : ''}`}
                  onClick={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                  disabled={loading}  // Disable button during submission
                >
                  <span className="checkmark">&#10003;</span>
                </button>
                <button
                  type="button"
                  className="remove-option"
                  onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                  disabled={question.options.length <= 2 || loading} // Disable removal if only 2 options or during submission
                >
                  &#x2715;
                </button>
              </div>
            ))}


            <button
              className='btn btn-add-option'
              type="button"
              onClick={() => handleAddOption(questionIndex)}
              disabled={loading}  // Disable button during submission
            >
              Add Option
            </button>            

            </div>

            <label className='choose-answer-container'>
              Select Correct Answer:
              <select
                value={question.correctAnswerIndex}
                onChange={(e) => handleCorrectAnswerChange(questionIndex, parseInt(e.target.value))}
                disabled={loading}  // Disable dropdown during submission
              >
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    {optionIndex}: {option.slice(0, 20)} {/* Show first few words of the option */}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}

        <button
          className='btn'
          type="button"
          onClick={handleAddQuestion}
          disabled={loading}  // Disable button during submission
        >
          Add Another Question
        </button>

        <button
          className='btn btn-success'
          type="submit"
          disabled={loading}  // Disable button during submission
        >
          {loading ? 'Submitting...' : 'Publish Test'}
        </button>
      </form>
    </div>
  );
};

export default CreateTest;