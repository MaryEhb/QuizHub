import express from 'express';
import UserController from '../controllers/userController.js';
import ClassroomController from '../controllers/classroomController.js';

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
// Enroll in a classroom
router.post('/classrooms/:id/enroll', ClassroomController.enrollInClassroom);
// Remove from a classroom
router.post('/classrooms/:id/remove', ClassroomController.removeFromClassroom);
// Get all classrooms for a user
router.get('/users/:userId/classrooms', ClassroomController.getClassroomsForUser);

export default router;