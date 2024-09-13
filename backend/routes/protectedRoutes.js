import express from 'express';
import UserController from '../controllers/userController.js';
import ClassroomController from '../controllers/classroomController.js';
import TestController from '../controllers/testController.js';
import SubmissionController from '../controllers/SubmissionController.js';

const router = express.Router();

// Get the currently authenticated user's info
router.get('/users/me', UserController.getCurrentUser);
// Get user names and profile pictures by a list of IDs
router.post('/users/usersByIds', UserController.getUserInfoByIds);
// Get another user's info by ID
router.get('/users/user/:id', UserController.getUserById);
// Get and update the currently authenticated user's profile
router.get('/users/profile', UserController.getUserProfile);
router.put('/users/profile', UserController.updateUserProfile);
// Update and get recent classrooms viewed by the user
router.post('/users/recent-classrooms/:id', UserController.updateRecentClassrooms);
router.get('/users/recent-classrooms', UserController.getRecentClassrooms);

// Create a new classroom
router.post('/classrooms', ClassroomController.createClassroom);
// Get route for fetching all classrooms with index support
router.get('/classrooms', ClassroomController.getClassrooms);
// Get a classroom by ID
router.get('/classrooms/:id', ClassroomController.getClassroomById);
// Update a classroom
router.put('/classrooms/:id', ClassroomController.updateClassroom);
// Delete a classroom
router.delete('/classrooms/:id', ClassroomController.deleteClassroom);
// Remove from a classroom
router.post('/classrooms/:id/remove', ClassroomController.removeFromClassroom);

// Routes to enroll a user in a classroom
router.post('/classrooms/:id/enroll', ClassroomController.enrollInClassroom);
router.post('/classrooms/:id/unenroll', ClassroomController.unEnrollRequest);
router.put('/classrooms/:classroomId/enroll/:userId/accept', ClassroomController.acceptEnrollmentRequest);
router.put('/classrooms/:classroomId/enroll/:userId/reject', ClassroomController.rejectEnrollmentRequest);

// Get all classrooms for a user
router.get('/users/:userId/classrooms', ClassroomController.getClassroomsForUser);

// Create a new test in a classroom
router.post('/classrooms/:classroomId/tests', TestController.createTest);
// Get all tests for a classroom
router.get('/classrooms/:classroomId/tests', TestController.getTestsForClassroom);
// Get a specific test by its ID
router.get('/classrooms/:classroomId/tests/:testId', TestController.getTestById);
// Update a test
router.put('/classrooms/:classroomId/tests/:testId', TestController.updateTest);
// Delete a test
router.delete('/classrooms/:classroomId/tests/:testId', TestController.deleteTest);

// Submit a test by testId
router.post('/tests/:testId/submit', SubmissionController.createSubmission);
// Delete a submission by submissionId (only for test owner)
router.delete('/tests/:testId/submissions/:submissionId', SubmissionController.deleteSubmission);

export default router;