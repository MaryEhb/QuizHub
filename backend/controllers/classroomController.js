// ClassroomController: Manages classroom-related actions including creating, updating,
// and retrieving classroom details, and managing classroom membership and tests.
import User from '../model/User.js';
import Classroom from '../model/Classroom.js';
import Test from '../model/Test.js';

class ClassroomController {
  // Create a new classroom
  static async createClassroom(req, res) {
    try {
      const { title, description, isPublic } = req.body;
      const owner = req.user.id;  // Directly use req.user.id
      console.log(owner);  // Log the owner ID for debugging

      // Create a new classroom instance
      const newClassroom = new Classroom({
        title,
        description,
        isPublic,
        owner,
        members: [],
      });

      // Save the classroom to the database
      await newClassroom.save();

      // Update the owner’s ownedClassrooms list
      req.user.ownedClassrooms.push(newClassroom._id);
      await req.user.save();

      res.status(201).json(newClassroom._id);
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error creating classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get all unowned classrooms for with pagination
  static async getClassrooms(req, res) {
    try {
      const { limit = 10, skip = 0 } = req.query; // Default limit of 10 classrooms
      const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID

      // Find classrooms that the user doesn't own
      const classrooms = await Classroom.find({ owner: { $ne: userId } })
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(parseInt(skip)) // Skip the number of classrooms based on the skip value
        .limit(parseInt(limit)) // Limit the number of classrooms returned
        .select('title description isPublic members tests maxScore createdAt')
        .populate('members', 'firstName lastName') // Populate members' names
        .populate('tests', 'title');

      const transformedClassrooms = classrooms.map(classroom => ({
        id: classroom._id.toString(), // Convert ObjectId to string
        ...classroom._doc // Spread the remaining fields
      }));

      // Total number of classrooms excluding the ones the user owns
      const totalClassrooms = await Classroom.countDocuments({ owner: { $ne: userId } });
      const hasMoreClassrooms = totalClassrooms > parseInt(skip) + parseInt(limit);

      res.status(200).json({
        classrooms: transformedClassrooms,
        hasMoreClassrooms, // Indicator if there are more classrooms available
        totalClassrooms
      });
    } catch (error) {
      // Log the error and send a response with the error message
      console.error('Error retrieving classrooms:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get classroom by ID
  static async getClassroomById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id; 

      // Find the classroom and populate related fields
      const classroom = await Classroom.findById(id)
        .populate('owner', 'firstName lastName')
        .populate('members', 'firstName lastName')
        .populate('tests');

      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      // Check if the user is the owner or a member of the classroom
      if (classroom.owner._id.toString() !== userId && !classroom.members.some(member => member._id.toString() === userId)) {
        return res.status(403).json({ message: 'Not authorized to view this classroom' });
      }

      res.status(200).json(classroom);
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error retrieving classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Update classroom details
  static async updateClassroom(req, res) {
    try {
      const { id } = req.params;
      const { title, description, isPublic } = req.body;

      // Check if the user is the owner of the classroom
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      if (classroom.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this classroom' });
      }

      // Update classroom details
      const updatedClassroom = await Classroom.findByIdAndUpdate(
        id,
        { title, description, isPublic },
        { new: true }
      );

      res.status(200).json({
        message: 'Classroom updated successfully',
        classroom: updatedClassroom,
      });
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error updating classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a classroom
  static async deleteClassroom(req, res) {
    try {
      const { id } = req.params;

      // Check if the user is the owner of the classroom
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      if (classroom.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this classroom' });
      }

      // Remove classroom from the database
      await Classroom.findByIdAndDelete(id);

      // Remove classroom ID from the owner’s ownedClassrooms list
      req.user.ownedClassrooms = req.user.ownedClassrooms.filter(classroomId => classroomId.toString() !== id);
      await req.user.save();

      // Remove classroom ID from all members’ enrolledClassrooms list
      for (const memberId of classroom.members) {
        const member = await User.findById(memberId);
        if (member) {
          member.enrolledClassrooms = member.enrolledClassrooms.filter(classroomId => classroomId.toString() !== id);
          await member.save();
        }
      }

      res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error deleting classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Enroll a user in a classroom
  static async enrollInClassroom(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;  // Directly use req.user.id

      // Find the classroom by ID
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      // Check if the user is already a member
      if (classroom.members.includes(userId)) {
        return res.status(400).json({ message: 'Already enrolled in classroom' });
      }

      // Add user to classroom members list
      classroom.members.push(userId);
      await classroom.save();

      // Add classroom to user's enrolled classrooms list
      if (req.user.enrolledClassrooms.includes(id)) {
        return res.status(400).json({ message: 'User already enrolled in this classroom' });
      }

      req.user.enrolledClassrooms.push(id);
      await req.user.save();

      res.status(200).json({ message: 'Successfully enrolled in classroom' });
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error enrolling in classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Remove a user from a classroom
  static async removeFromClassroom(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;  // Directly use req.user.id

      // Find the classroom by ID
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      // Check if the user is a member of the classroom
      if (!classroom.members.includes(userId)) {
        return res.status(400).json({ message: 'Not enrolled in classroom' });
      }

      // Remove user from classroom members list
      classroom.members = classroom.members.filter(member => member.toString() !== userId);
      await classroom.save();

      // Remove classroom ID from the user’s enrolledClassrooms list
      req.user.enrolledClassrooms = req.user.enrolledClassrooms.filter(classroomId => classroomId.toString() !== id);
      await req.user.save();

      res.status(200).json({ message: 'Successfully removed from classroom' });
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error removing from classroom:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get all classrooms for a specific user
  static async getClassroomsForUser(req, res) {
    try {
      const { userId } = req.params;

      // Retrieve owned and enrolled classrooms for the user
      const ownedClassrooms = await Classroom.find({ owner: userId })
      .select('title description isPublic members tests maxScore')
      .populate('members', 'firstName lastName') // Populate members' names
      .populate('tests', 'title'); // Populate test titles

      // Get enrolled classrooms
      const enrolledClassrooms = await Classroom.find({ members: userId })
      .select('title description isPublic members tests maxScore')
      .populate('members', 'firstName lastName') // Populate members' names
      .populate('tests', 'title'); // Populate test titles

      res.status(200).json({
        ownedClassrooms,
        enrolledClassrooms,
      });
    } catch (error) {
      // Log the error and send response with error message
      console.error('Error retrieving classrooms for user:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

export default ClassroomController;