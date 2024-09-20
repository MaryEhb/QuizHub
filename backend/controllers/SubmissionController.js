import Submission from '../model/Submission.js';
import Test from '../model/Test.js';

class SubmissionController {
  // Create a submission for a test
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
  
      // Check if the test is currently open (optional)
      const currentTime = new Date();
      if (currentTime < test.startTime) {
        return res.status(400).json({ message: 'Test has not started yet.' });
      }
  
      // If `endTime` is specified, check if the test has ended
      if (test.endTime && currentTime > test.endTime) {
        return res.status(400).json({ message: 'Test has already ended.' });
      }
  
      // Check if the test allows multiple submissions
      if (!test.allowMultipleSubmissions) {
        // Check if the user has already submitted for the test
        const existingSubmission = await Submission.findOne({ testId, userId });
  
        if (existingSubmission) {
          return res.status(409).json({ message: 'Submission already exists for this test.' });
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
  
      res.status(201).json(submission);
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({ message: 'Failed to create submission', error: error.message });
    }
  };  

  // Delete a submission for a test
  static deleteSubmission = async (req, res) => {
    try {
      const { submissionId, testId } = req.params;

      // Find the test
      const test = await Test.findById(testId).populate('classroomId');
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

      // Check if the authenticated user is the classroom owner
      const isClassroomOwner = test.classroomId.owner.toString() === req.user._id.toString();
      if (!isClassroomOwner) {
        return res.status(403).json({ message: 'You are not authorized to delete this submission.' });
      }

      // Delete the submission
      const deletedSubmission = await Submission.findByIdAndDelete(submissionId);

      // TODO: update the Test's leaderboard or submissions

      res.status(200).json({ message: 'Submission deleted successfully', deletedSubmission });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting submission', error });
    }
  };

}

export default SubmissionController;