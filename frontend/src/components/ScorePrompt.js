import React from 'react';
import stressedImage from '../assets/stressed.svg';  // Imported as an image
import studyingImage from '../assets/studying.svg';  // Imported as an image
import celebratingImage from '../assets/great-job.svg';  // Imported as an image

const ScorePrompt = ({ handleViewTest, correctAnswersCount, totalQuestionsCount, handleGoBackToClassroom }) => {

    const scorePercentage = (correctAnswersCount / totalQuestionsCount) * 100;
    let chosenImage, message, scoreClass;

    if (scorePercentage <= 30) {
        chosenImage = stressedImage;
        message = "Hard luck! Don't stress, with more practice you'll do better next time!";
        scoreClass = 'low';
      } else if (scorePercentage > 30 && scorePercentage < 80) {
        chosenImage = studyingImage;
        message = "You're on the right track! Keep studying and you'll score even higher!";
        scoreClass = 'mid';
      } else {
        chosenImage = celebratingImage;
        message = "Excellent job! You're a star, keep it up!";
        scoreClass = 'high';
      }

  return (
    <div className='score-prompt'>
      <div className='prompt-container'>
        <div className='prompt-background' onClick={handleViewTest}></div>
        <div className="submission-prompt prompt">
          <div className='icon score-illustration' style={{ backgroundImage: `url(${chosenImage})` }}></div>
          <p className='score-container'>
            You scored 
            <span className={`score-text ${scoreClass}`}> {correctAnswersCount}</span> out of 
            <span className='score-text'> {totalQuestionsCount}</span>.
            </p>
          <p className='encourage-msg'>{message}</p>
          <div>
            <button className='btn' onClick={handleViewTest}>View Test</button>
            <button className='btn btn-close' onClick={handleGoBackToClassroom}>Go Back to Classroom</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePrompt;