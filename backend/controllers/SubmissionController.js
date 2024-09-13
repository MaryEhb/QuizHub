import Submission from '../model/Submission.js';
import Test from '../model/Test.js';

class SubmissionController {
  static createSubmission = async (req, res) => {
    const { answers, score } = req.body;
    const userId = req.user.id;
    const testId = req.params.testId;

    try {
      // Find the test
      const test = await Test.findById(testId);
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }

      // Check if the test allows multiple submissions
      if (!test.allowMultipleSubmissions) {
        // Check if the user has already submitted for the test
        const existingSubmission = await Submission.findOne({ testId, userId });

        if (existingSubmission) {
          return res.status(400).json({ message: 'Submission already exists for this test.' });
        }
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

  static deleteSubmission = async (req, res) => {
    try {
      const { submissionId, testId } = req.params;

      // Find the test
      const test = await Test.findById(testId);
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }

      // Find the submission
      const submission = await Submission.findById(submissionId);
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }

      // Ensure that submission belongs to the test before deletion
      if (submission.testId.toString() !== test._id.toString()) {
        return res.status(400).json({ message: 'Submission does not belong to this test' });
      }

      // Delete the submission using findByIdAndDelete
      await Submission.findByIdAndDelete(submissionId);

      // Optionally update the Test's leaderboard or submissions
      res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting submission', error });
    }
  };
}

export default SubmissionController;