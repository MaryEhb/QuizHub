import Submission from "../model/Submission.js";

class SubmissionController {
  static createSubmission = async (req, res) => {
    const { answers, score } = req.body;
    const userId = req.user.id;
    const testId = req.params.testId;

    try {
      // Check if the user has already submitted for the test
      const existingSubmission = await Submission.findOne({ testId, userId });

      if (existingSubmission) {
        return res.status(400).json({ message: 'Submission already exists for this test.' });
      }

      // Validate that the answers are provided
      if (!answers || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ message: 'Answers are required to submit the test.' });
      }

      // Create new submission
      const submission = new Submission({
        testId,
        userId,
        answers,
        score: score || 0, // If no score is provided, default to 0
        status: 'finalized', // Default status is finalized
      });

      await submission.save();

      res.status(201).json({ message: 'Submission saved successfully', submission });
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({ message: 'Failed to create submission', error: error.message });
    }
  };
}

export default SubmissionController;