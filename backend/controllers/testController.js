import Test from '../model/Test.js';
import Classroom from '../model/Classroom.js';
import Submission from '../model/Submission.js';
import User from '../model/User.js'

class TestController {
  // Static method to create a new test in a classroom
  static async createTest(req, res) {
    try {
      const { classroomId } = req.params;
      const { title, description, requirements, allowMultipleSubmissions, questions, isPublished=true } = req.body;

      // Ensure title is a string
      const testTitle = String(title);

      // Set startTime to the current time if not provided
      const testStartTime = new Date();

      // Calculate maxScore based on the number of questions if not provided
      const calculatedMaxScore = questions ? questions.length : 0;

      // Find the classroom and verify the user is the owner
      const classroom = await Classroom.findById(classroomId);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
      
      // Check if the authenticated user is the owner of the classroom
      if (classroom.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }

      const newTest = new Test({
        classroomId,
        title: testTitle,
        description,
        requirements,
        allowMultipleSubmissions,
        startTime: testStartTime,
        questions,
        maxScore: calculatedMaxScore,
        isPublished,
      });

      await newTest.save();
      classroom.tests.push(newTest._id);
      await classroom.save();

      return res.status(201).json(newTest);
    } catch (error) {
      console.error('Error creating test:', error);
      return res.status(500).json({ message: 'Failed to create test', error });
    }
  }

  // Static method to get all tests for a classroom
  static async getTestsForClassroom(req, res) {
    try {
      const { classroomId } = req.params;
      const tests = await Test.find({ classroomId });
      return res.status(200).json(tests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to get tests', error });
    }
  }

  // Static method to get a specific test by its ID
  static async getTestById(req, res) {
    try {
      const { testId } = req.params;
      const test = await Test.findById(testId).populate({
        path: 'classroomId',
        select: 'owner'
      });
  
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }

      // Check if the authenticated user is the owner
      const isOwner = test.classroomId.owner.toString() === req.user._id.toString();
      let submissions = [];
      if (isOwner) {
        // Fetch submissions and populate user details
        submissions = await Submission.find({ testId })
          .populate({
            path: 'userId',
            select: 'firstName lastName'
          });

      } else {
        // Fetch the authenticated user's submission if they have one
        submissions = await Submission.find({
          testId,
          userId: req.user._id
        });
      }


      return res.status(200).json({
        ...test.toObject(),
        submissions
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to get test', error });
    }
  }

  // Static method to update a test
  static async updateTest(req, res) {
    try {
      const { classroomId, testId } = req.params;

      // Find the classroom and verify the user is the owner
      const classroom = await Classroom.findById(classroomId);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      // Check if the authenticated user is the owner of the classroom
      if (classroom.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }

      const updatedTest = await Test.findByIdAndUpdate(testId, req.body, { new: true });
      if (!updatedTest) {
        return res.status(404).json({ message: 'Test not found' });
      }
      return res.status(200).json(updatedTest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update test', error });
    }
  }

  // Static method to delete a test
  static async deleteTest(req, res) {
    try {
      const { classroomId, testId } = req.params;

      // Find the classroom and verify the user is the owner
      const classroom = await Classroom.findById(classroomId);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      // Check if the authenticated user is the owner of the classroom
      if (classroom.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }

      const test = await Test.findByIdAndDelete(testId);
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }

      // Remove test from classroom's tests array
      classroom.tests = classroom.tests.filter(id => id.toString() !== testId);
      await classroom.save();

      return res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete test', error });
    }
  }
}

export default TestController;